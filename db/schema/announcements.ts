import { pgTable, serial, text, timestamp, integer, index } from 'drizzle-orm/pg-core';
import { users } from './users';
import { groups } from './groups';
import { uniqueWhenNotDeleted } from './utils';

export const announcements = pgTable(
  'announcements',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    message: text('message').notNull(), // markdown
    groupId: integer('group_id').references(() => groups.id),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id),
    startDate: timestamp('start_date').defaultNow().notNull(),
    endDate: timestamp('end_date'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [uniqueWhenNotDeleted(table, 'name')(index())]
);
