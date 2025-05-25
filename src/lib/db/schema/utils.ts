import { sql } from 'drizzle-orm';
import { IndexBuilderOn, PgColumn } from 'drizzle-orm/pg-core';

export function uniqueWhenNotDeleted(deletedAt: PgColumn, indexOn: PgColumn) {
  return (index: IndexBuilderOn) => {
    return index.on(indexOn).where(sql`${deletedAt} IS NULL`);
  };
}
