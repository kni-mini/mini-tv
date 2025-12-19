'use server';

import { db } from '@/db';
import { users, User } from '@/db/schema/users';
import { eq } from 'drizzle-orm';

export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0] || null;
}

export async function createUser(data: Omit<User, 'id'>): Promise<User> {
  const result = await db
    .insert(users)
    .values({ ...data })
    .returning();
  return result[0];
}
