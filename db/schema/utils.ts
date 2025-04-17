import { IndexBuilder, IndexBuilderOn } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export function uniqueWhenNotDeleted(table: any, columnName: string) {
  return (index: IndexBuilderOn) => {
    return index
      .on(table[columnName])
      .where(sql`${table.deletedAt} IS NULL`);
  };
} 