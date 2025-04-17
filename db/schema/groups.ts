import { pgTable, serial, text, timestamp, integer, pgEnum, index } from 'drizzle-orm/pg-core';
import { users } from './users';
import { uniqueWhenNotDeleted } from './utils';

const groupTypeEnum = pgEnum('group_type', ['event', 'announcement', 'poster']);

export const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  color: text('color').notNull(), // hex encoded
  type: groupTypeEnum('type').notNull(),
  userId: integer('user_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
}, (table) => [
  uniqueWhenNotDeleted(table, 'name')(index()),
]); 