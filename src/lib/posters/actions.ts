'use server';

import { db } from '@/db';
import { Poster, posters } from '@/db/schema/posters';
import { isNull, and, gt, lt, or, eq } from 'drizzle-orm';

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

export async function getPosterById(id: number): Promise<Poster | null> {
  const result = await db
    .select()
    .from(posters)
    .where(and(isNull(posters.deletedAt), eq(posters.id, id)))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}
