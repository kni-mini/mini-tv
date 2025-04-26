import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const groupTypes = pgTable('group_types', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});
