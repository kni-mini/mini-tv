import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const images = pgTable('images', {
  id: serial('id').primaryKey(),
  file: text('file').notNull(), // base64 encoded file
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
}); 