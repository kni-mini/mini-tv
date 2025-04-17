import { pgTable, serial, text, timestamp, integer, index } from 'drizzle-orm/pg-core';
import { users } from './users';
import { uniqueWhenNotDeleted } from './utils';
import { groupType } from './enums';

export const groups = pgTable(
  'groups',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    color: text('color').notNull(), // hex encoded
    type: groupType('type').notNull(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [uniqueWhenNotDeleted(table, table.name)(index())]
);
