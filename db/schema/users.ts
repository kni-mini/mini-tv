import { pgTable, serial, text, timestamp, integer, index } from 'drizzle-orm/pg-core';
import { studentClubs } from './student-clubs';
import { uniqueWhenNotDeleted } from './utils';
import { userRole } from './enums';

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    username: text('username').notNull(),
    password: text('password').notNull(),
    role: userRole('role').notNull(),
    studentClubId: integer('student_club_id').references(() => studentClubs.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [uniqueWhenNotDeleted(table, table.username)(index())]
);
