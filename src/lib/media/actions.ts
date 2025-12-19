'use server';

import { db } from '@/db';
import { medias } from '@/db/schema/medias';
import { eq } from 'drizzle-orm';

export async function getMediaById(id: number) {
  return await db
    .select()
    .from(medias)
    .where(eq(medias.id, id))
    .then((res) => res[0]);
}
