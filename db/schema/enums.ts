import { pgEnum } from 'drizzle-orm/pg-core';

export const userRole = pgEnum('user_role', ['admin', 'user', 'student_club']);
export const groupType = pgEnum('group_type', ['event', 'announcement']);
