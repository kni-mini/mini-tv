'use server';

import { db } from '@/db';
import { announcements } from '@/db/schema/announcements';
import { eq, lt, gt, and, isNull, or } from 'drizzle-orm';

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
