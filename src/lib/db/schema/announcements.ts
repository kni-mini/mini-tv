import { pgTable, serial, text, timestamp, integer, index } from 'drizzle-orm/pg-core';
import { organizations } from './organizations';
import { groups } from './groups';
import { uniqueWhenNotDeleted } from './utils';
import { medias } from './medias';

export const announcements = pgTable(
  'announcements',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    message: text('message').notNull(), // markdown
    groupId: integer('group_id').references(() => groups.id),
    organizationId: integer('organization_id')
      .notNull()
      .references(() => organizations.id),
    mediaId: integer('media_id').references(() => medias.id),
    startDate: timestamp('start_date').defaultNow().notNull(),
    endDate: timestamp('end_date'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [uniqueWhenNotDeleted(table.deletedAt, table.name)(index())]
);
