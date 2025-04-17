import { pgTable, serial, text, timestamp, pgEnum, integer } from 'drizzle-orm/pg-core';
import { userRoleEnum } from './enums';
import { studentClubs } from './student-clubs';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  role: pgEnum('user_role', userRoleEnum).notNull(),
  studentClubId: integer('student_club_id').references(() => studentClubs.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
}); 