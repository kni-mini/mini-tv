'use server';

import { db } from '@/db';
import { organizations } from '@/db/schema/organizations';
import { eq } from 'drizzle-orm';

export async function getOrganizationById(id: number) {
  return await db
    .select()
    .from(organizations)
    .where(eq(organizations.id, id))
    .then((res) => res[0]);
}
