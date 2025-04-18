import { pgTable, serial, text, timestamp, index } from 'drizzle-orm/pg-core';
import { uniqueWhenNotDeleted } from './utils';

export const organizations = pgTable(
  'organizations',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    shortName: text('short_name').notNull(),
    imageId: text('image_id').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    uniqueWhenNotDeleted(table, table.name)(index()),
    uniqueWhenNotDeleted(table, table.shortName)(index()),
  ]
);
