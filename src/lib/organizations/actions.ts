'use server';

import { db } from '@/lib/db';
import { organizations } from '@/lib/db/schema/organizations';
import { eq } from 'drizzle-orm';

export async function getOrganizationById(id: number) {
  return await db
    .select()
    .from(organizations)
    .where(eq(organizations.id, id))
    .then((res) => res[0]);
}

export async function getAllOrganizations() {
  return await db.select().from(organizations);
}
