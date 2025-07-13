'use server';

import { db } from '@/lib/db';
import { users, User } from '@/lib/db/schema/users';
import { eq, and, isNull } from 'drizzle-orm';
import { userOrganizations } from '@/lib/db/schema/user-organizations';

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

export async function getAllUsers() {
  return await db.select().from(users);
}

export async function getUserWithOrganization(userId: number) {
  const result = await db
    .select({
      user: users,
      organizationId: userOrganizations.organizationId,
    })
    .from(users)
    .leftJoin(userOrganizations, eq(users.id, userOrganizations.userId))
    .where(and(eq(users.id, userId), isNull(userOrganizations.deletedAt)))
    .limit(1);

  return result[0] || null;
}

export async function getCurrentUserOrganization(userEmail: string) {
  const result = await db
    .select({
      organizationId: userOrganizations.organizationId,
    })
    .from(users)
    .leftJoin(userOrganizations, eq(users.id, userOrganizations.userId))
    .where(and(eq(users.email, userEmail), isNull(userOrganizations.deletedAt)))
    .limit(1);

  return result[0]?.organizationId || null;
}
