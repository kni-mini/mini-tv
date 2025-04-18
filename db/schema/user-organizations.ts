import { pgTable, integer, timestamp, primaryKey } from 'drizzle-orm/pg-core';
import { users } from './users';
import { organizations } from './organizations';

export const userOrganizations = pgTable(
  'user_organizations',
  {
    userId: integer('user_id')
      .references(() => users.id)
      .notNull(),
    organizationId: integer('organization_id')
      .references(() => organizations.id)
      .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.organizationId] }),
  })
);
