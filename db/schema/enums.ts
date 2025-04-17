export const userRoleEnum = ['dean', 'student_council', 'student_club'] as const;
export type UserRole = typeof userRoleEnum[number];

export const groupTypeEnum = ['event', 'announcement', 'poster'] as const;
export type GroupType = typeof groupTypeEnum[number]; 