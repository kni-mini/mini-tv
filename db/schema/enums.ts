import { pgEnum } from 'drizzle-orm/pg-core';

export const userRole = pgEnum('user_role', ['dean', 'student_council', 'student_club']);
export const groupType = pgEnum('group_type', ['event', 'announcement', 'poster']);
