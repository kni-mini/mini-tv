'use server';

import { db } from '@/lib/db';
import { groups } from '@/lib/db/schema/groups';
import { isNull } from 'drizzle-orm';

export async function getAllGroups() {
  return await db.select().from(groups).where(isNull(groups.deletedAt));
}
