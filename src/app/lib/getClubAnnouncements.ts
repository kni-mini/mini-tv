"use server";

import { db } from '@/lib/db';
import { users } from '@/lib/db/schema/users';
import { announcements } from '@/lib/db/schema/announcements';
import { medias } from '@/lib/db/schema/medias';
import { eq, isNull, and, desc } from 'drizzle-orm';
import { userOrganizations } from '@/lib/db/schema/user-organizations';

export async function getClubAnnouncementsForUser(userId: number) {
  const rows = await db
    .select({
      id: announcements.id,
      title: announcements.name,
      body: announcements.message,
      startDate: announcements.startDate,
      endDate: announcements.endDate,
      mediaFile: medias.file,
      mediaType: medias.type,
    })
    .from(announcements)
    // only organizations the user belongs to (and which haven’t been soft‐deleted)
    .innerJoin(
      userOrganizations,
      and(
        eq(userOrganizations.organizationId, announcements.organizationId),
        eq(userOrganizations.userId, userId),
        isNull(userOrganizations.deletedAt),
      )
    )
    // grab media if any
    .leftJoin(
      medias,
      eq(announcements.mediaId, medias.id),
    )
    // optionally skip soft‐deleted announcements
    .where(isNull(announcements.deletedAt))
    .orderBy(desc(announcements.startDate));

  return rows.map(r => ({
    id:        r.id,
    title:     r.title,
    body:      r.body,
    mediaSrc:  r.mediaFile && r.mediaType
               ? `data:${r.mediaType};base64,${r.mediaFile}`
               : undefined,
    mediaType: r.mediaType ?? undefined,
  }));
}

