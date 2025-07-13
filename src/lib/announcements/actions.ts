'use server';

import { db } from '@/lib/db';
import { announcements } from '@/lib/db/schema/announcements';
import { medias } from '@/lib/db/schema/medias';
import { eq, desc, and, lt, or, isNull, gt } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { AnnouncementFormData } from '@/lib/validators/forms';
import { revalidatePath } from 'next/cache';
import { getCurrentUserOrganization } from '@/lib/users/actions';
import { authOptions } from '@/lib/auth';

export async function getClubAnnouncements() {
  try {
    const result = await db
      .select({
        id: announcements.id,
        name: announcements.name,
        message: announcements.message,
        startDate: announcements.startDate,
        endDate: announcements.endDate,
        mediaFile: medias.file,
        mediaType: medias.type,
      })
      .from(announcements)
      .leftJoin(medias, eq(announcements.mediaId, medias.id))
      .orderBy(desc(announcements.startDate));

    return result.map((row) => ({
      title: row.name,
      body: row.message,
      clubName: row.name,
      mediaSrc:
        row.mediaFile && row.mediaType
          ? `data:${row.mediaType};base64,${row.mediaFile}`
          : undefined,
      mediaType: row.mediaType ?? undefined,
    }));
  } catch (e) {
    console.error('Drizzle query failed:', e);
    throw e;
  }
}

export async function createAnnouncement(data: AnnouncementFormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: 'User not authenticated' };
    }

    // Get user's organization
    const organizationId = await getCurrentUserOrganization(session.user.email);
    if (!organizationId) {
      return { success: false, error: 'User not associated with any organization' };
    }

    let mediaId = null;

    // Create media if provided
    if (data.mediaFile && data.mediaType && data.mediaName) {
      const mediaResult = await db
        .insert(medias)
        .values({
          name: data.mediaName,
          type: data.mediaType,
          file: data.mediaFile,
        })
        .returning();
      mediaId = mediaResult[0].id;
    }

    const result = await db
      .insert(announcements)
      .values({
        name: data.name,
        message: data.message,
        groupId: data.groupId || null,
        organizationId,
        creatorId: Number(session.user.id),
        mediaId,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      })
      .returning();

    revalidatePath('/admin/announcements');
    return { success: true, data: result[0] };
  } catch (error) {
    console.error('Error creating announcement:', error);
    return { success: false, error: 'Failed to create announcement' };
  }
}

export async function getAllAnnouncements() {
  return await db.select().from(announcements);
}

export async function getAnnouncementById(id: number) {
  return await db.select().from(announcements).where(eq(announcements.id, id));
}

export async function getActiveAnnouncements() {
  const currentDate = new Date();
  return await db
    .select()
    .from(announcements)
    .where(
      and(
        isNull(announcements.deletedAt),
        lt(announcements.startDate, currentDate),
        or(isNull(announcements.endDate), gt(announcements.endDate, currentDate))
      )
    );
}

export async function getUpcomingAnnouncements() {
  const currentDate = new Date();
  return await db
    .select()
    .from(announcements)
    .where(and(isNull(announcements.deletedAt), gt(announcements.startDate, currentDate)));
}

export async function updateAnnouncement(id: number, data: AnnouncementFormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: 'User not authenticated' };
    }

    // Get user's organization
    const organizationId = await getCurrentUserOrganization(session.user.email);
    if (!organizationId) {
      return { success: false, error: 'User not associated with any organization' };
    }

    // Check if announcement exists and belongs to user's organization
    const existingAnnouncement = await db
      .select()
      .from(announcements)
      .where(and(eq(announcements.id, id), eq(announcements.organizationId, organizationId)))
      .limit(1);

    if (!existingAnnouncement[0]) {
      return { success: false, error: 'Announcement not found or access denied' };
    }

    let mediaId = existingAnnouncement[0].mediaId;

    // Create new media if provided
    if (data.mediaFile && data.mediaType && data.mediaName) {
      const mediaResult = await db
        .insert(medias)
        .values({
          name: data.mediaName,
          type: data.mediaType,
          file: data.mediaFile,
        })
        .returning();
      mediaId = mediaResult[0].id;
    }

    const result = await db
      .update(announcements)
      .set({
        name: data.name,
        message: data.message,
        groupId: data.groupId || null,
        mediaId,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      })
      .where(eq(announcements.id, id))
      .returning();

    revalidatePath('/admin/announcements');
    revalidatePath('/admin/scheduled');
    return { success: true, data: result[0] };
  } catch (error) {
    console.error('Error updating announcement:', error);
    return { success: false, error: 'Failed to update announcement' };
  }
}
