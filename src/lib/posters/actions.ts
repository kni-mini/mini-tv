'use server';

import { db } from '@/lib/db';
import { Poster, posters } from '@/lib/db/schema/posters';
import { medias } from '@/lib/db/schema/medias';
import { users } from '@/lib/db/schema/users';
import { isNull, and, gt, lt, or, eq } from 'drizzle-orm';
import { PosterFormData } from '@/lib/validators/forms';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function getAllPosters() {
  return await db.select().from(posters);
}

export async function getActivePosters() {
  const currentDate = new Date();
  return await db
    .select()
    .from(posters)
    .where(
      and(
        isNull(posters.deletedAt),
        lt(posters.startDate, currentDate),
        or(isNull(posters.endDate), gt(posters.endDate, currentDate))
      )
    );
}

export async function getUpcomingPosters() {
  const currentDate = new Date();
  return await db
    .select()
    .from(posters)
    .where(and(isNull(posters.deletedAt), gt(posters.startDate, currentDate)));
}

export async function getPosterById(id: number): Promise<Poster | null> {
  const result = await db
    .select()
    .from(posters)
    .where(and(isNull(posters.deletedAt), eq(posters.id, id)))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function createPoster(data: PosterFormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: 'User not authenticated' };
    }

    // Create media first (required for posters)
    const mediaResult = await db
      .insert(medias)
      .values({
        name: data.mediaName,
        type: data.mediaType,
        file: data.mediaFile,
      })
      .returning();

    const result = await db
      .insert(posters)
      .values({
        name: data.name,
        mediaId: mediaResult[0].id,
        groupId: data.groupId || null,
        creatorId: Number(session.user.id),
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      })
      .returning();

    revalidatePath('/admin/posters');
    return { success: true, data: result[0] };
  } catch (error) {
    console.error('Error creating poster:', error);
    return { success: false, error: 'Failed to create poster' };
  }
}

export async function updatePoster(id: number, data: PosterFormData) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { success: false, error: 'User not authenticated' };
    }

    // Get current user ID
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.email, session.user.email))
      .limit(1);
    if (!userResult[0]) {
      return { success: false, error: 'User not found' };
    }
    const userId = userResult[0].id;

    // Check if poster exists and belongs to current user
    const existingPoster = await db
      .select()
      .from(posters)
      .where(and(eq(posters.id, id), eq(posters.creatorId, userId)))
      .limit(1);

    if (!existingPoster[0]) {
      return { success: false, error: 'Poster not found or access denied' };
    }

    let mediaId = existingPoster[0].mediaId;

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
      .update(posters)
      .set({
        name: data.name,
        mediaId,
        groupId: data.groupId || null,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
      })
      .where(eq(posters.id, id))
      .returning();

    revalidatePath('/admin/posters');
    revalidatePath('/admin/scheduled');
    return { success: true, data: result[0] };
  } catch (error) {
    console.error('Error updating poster:', error);
    return { success: false, error: 'Failed to update poster' };
  }
}
