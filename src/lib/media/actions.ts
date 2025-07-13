'use server';

import { db } from '@/lib/db';
import { medias } from '@/lib/db/schema/medias';
import { eq, isNull } from 'drizzle-orm';
import { MediaFormData } from '@/lib/validators/forms';
import { revalidatePath } from 'next/cache';

export async function getMediaById(id: number) {
  return await db
    .select()
    .from(medias)
    .where(eq(medias.id, id))
    .then((res) => res[0]);
}

export async function getAllMedias() {
  return await db.select().from(medias).where(isNull(medias.deletedAt));
}

export async function createMedia(data: MediaFormData) {
  try {
    const result = await db
      .insert(medias)
      .values({
        name: data.name,
        type: data.type,
        file: data.file,
      })
      .returning();

    revalidatePath('/admin');
    return { success: true, data: result[0] };
  } catch (error) {
    console.error('Error creating media:', error);
    return { success: false, error: 'Failed to create media' };
  }
}
