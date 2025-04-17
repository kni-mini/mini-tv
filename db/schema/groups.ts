import { pgTable, serial, text, timestamp, integer, pgEnum, index } from 'drizzle-orm/pg-core';
import { users } from './users';
import { groupTypeEnum } from './enums';
import { uniqueWhenNotDeleted } from './utils';

export const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  color: text('color').notNull(), // hex encoded
  type: pgEnum('group_type', groupTypeEnum).notNull(),
  userId: integer('user_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
}, (table) => ({
  nameIdx: uniqueWhenNotDeleted('groups', 'name')(index()),
})); 