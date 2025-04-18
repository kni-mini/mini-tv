import { pgTable, serial, text, timestamp, integer, index } from 'drizzle-orm/pg-core';
import { images } from './images';
import { uniqueWhenNotDeleted } from './utils';

export const organizations = pgTable(
  'organizations',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    shortName: text('short_name').notNull(),
    imageId: integer('image_id').references(() => images.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    uniqueWhenNotDeleted(table.deletedAt, table.name)(index()),
    uniqueWhenNotDeleted(table.deletedAt, table.shortName)(index()),
  ]
);
