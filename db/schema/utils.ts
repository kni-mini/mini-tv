import { IndexBuilderOn } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function uniqueWhenNotDeleted(table: any, indexOn: any) {
  return (index: IndexBuilderOn) => {
    return index.on(indexOn).where(sql`${table.deletedAt} IS NULL`);
  };
}
