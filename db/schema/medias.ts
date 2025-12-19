import { pgTable, serial, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const mediaTypeEnum = pgEnum('media_type', ['image', 'gif', 'video']);

export const medias = pgTable('medias', {
  id: serial('id').primaryKey(),
  file: text('file').notNull(), // base64 encoded file
  name: text('name'),
  type: mediaTypeEnum('type').notNull(), // image, gif, video
  createdAt: timestamp('created_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});
