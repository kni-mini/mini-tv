import { pgTable, serial, text, timestamp, index } from 'drizzle-orm/pg-core';
import { uniqueWhenNotDeleted } from './utils';

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    username: text('username').notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [uniqueWhenNotDeleted(table, table.username)(index())]
);
