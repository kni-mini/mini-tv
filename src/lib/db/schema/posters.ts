import { pgTable, serial, text, timestamp, integer, index } from 'drizzle-orm/pg-core';
import { users } from './users';
import { groups } from './groups';
import { medias } from './medias';
import { uniqueWhenNotDeleted } from './utils';

export const posters = pgTable(
  'posters',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    mediaId: integer('media_id')
      .notNull()
      .references(() => medias.id),
    groupId: integer('group_id').references(() => groups.id),
    creatorId: integer('creator_id')
      .notNull()
      .references(() => users.id),
    startDate: timestamp('start_date').defaultNow().notNull(),
    endDate: timestamp('end_date'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [uniqueWhenNotDeleted(table.deletedAt, table.name)(index())]
);

export type Poster = typeof posters.$inferSelect;
