import { pgTable, serial, text, timestamp, integer, index } from 'drizzle-orm/pg-core';
import { studentClubs } from './student-clubs';
import { uniqueWhenNotDeleted } from './utils';

export const userRoles = pgTable('user_roles', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    username: text('username').notNull(),
    password: text('password').notNull(),
    roleId: integer('role_id')
      .references(() => userRoles.id)
      .notNull(),
    studentClubId: integer('student_club_id').references(() => studentClubs.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [uniqueWhenNotDeleted(table, table.username)(index())]
);
