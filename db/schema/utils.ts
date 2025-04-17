import { IndexBuilder, IndexBuilderOn } from 'drizzle-orm/pg-core';

export function uniqueWhenNotDeleted(tableName: string, columnName: string) {
  return (index: IndexBuilderOn) => {
    return index
      .on(tableName, columnName)
      .where(`deleted_at IS NULL`);
  };
} 