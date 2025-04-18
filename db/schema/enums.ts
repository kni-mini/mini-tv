import { pgEnum } from 'drizzle-orm/pg-core';

export const groupType = pgEnum('group_type', ['event', 'announcement', 'poster']);
