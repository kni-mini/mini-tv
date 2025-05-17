import { pgTable, serial, text, timestamp, integer, index } from 'drizzle-orm/pg-core';
import { medias } from './medias';
import { uniqueWhenNotDeleted } from './utils';

export const organizations = pgTable(
  'organizations',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    shortName: text('short_name').notNull(),
    mediaId: integer('media_id').references(() => medias.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    uniqueWhenNotDeleted(table.deletedAt, table.name)(index()),
    uniqueWhenNotDeleted(table.deletedAt, table.shortName)(index()),
  ]
);
