import { pgTable, serial, text, timestamp, integer, boolean, index } from 'drizzle-orm/pg-core';
import { users } from './users';
import { groups } from './groups';
import { uniqueWhenNotDeleted } from './utils';

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  startsAt: timestamp('starts_at').notNull(),
  endsAt: timestamp('ends_at').notNull(),
  allDay: boolean('all_day').notNull().default(false),
  groupId: integer('group_id').references(() => groups.id),
  userId: integer('user_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
}, (table) => ({
  nameIdx: uniqueWhenNotDeleted(table, 'name')(index()),
})); 