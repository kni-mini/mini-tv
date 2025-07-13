import { pgTable, serial, text, timestamp, index, varchar } from 'drizzle-orm/pg-core';
import { uniqueWhenNotDeleted } from './utils';

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [uniqueWhenNotDeleted(table.deletedAt, table.email)(index())]
);

export type User = typeof users.$inferSelect;
