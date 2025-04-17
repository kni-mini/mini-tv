import { pgTable, serial, text, timestamp, pgEnum, integer, index } from 'drizzle-orm/pg-core';
import { studentClubs } from './student-clubs';
import { uniqueWhenNotDeleted } from './utils';

const userRoleEnum = pgEnum('user_role', ['dean', 'student_council', 'student_club']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  password: text('password').notNull(),
  role: userRoleEnum('role').notNull(),
  studentClubId: integer('student_club_id').references(() => studentClubs.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
}, (table) => [
  uniqueWhenNotDeleted(table, 'username')(index()),
]); 