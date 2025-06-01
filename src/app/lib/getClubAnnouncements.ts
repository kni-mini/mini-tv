"use server";

import { db } from '@/lib/db';
import { users } from '@/lib/db/schema/users';
import { announcements } from '@/lib/db/schema/announcements';
import { medias } from '@/lib/db/schema/medias';
import { eq, desc } from "drizzle-orm";

export async function getClubAnnouncements() {
  try {
    const now = new Date();

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

    return result.map(row => ({
      title: row.name,
      body: row.message,
      clubName: row.name,
      mediaSrc: row.mediaFile && row.mediaType ? `data:${row.mediaType};base64,${row.mediaFile}` : undefined,
      mediaType: row.mediaType ?? undefined,
    }));
  } 
  catch (e) 
  {
    console.error("Drizzle query failed:", e);
    throw e;
  }
}
