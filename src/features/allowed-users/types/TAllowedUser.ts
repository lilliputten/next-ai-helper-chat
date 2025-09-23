import { ExtendNullWithUndefined, ReplaceNullWithUndefined } from '@/lib/ts';
import { AllowedUser } from '@/generated/prisma';

// export type TAllowedUserId = AllowedUser['id'];
export type TAllowedUser = ExtendNullWithUndefined<AllowedUser>;
export type TAllowedUserReal = ReplaceNullWithUndefined<AllowedUser>;
export type TAllowedUserData = Omit<TAllowedUserReal, 'createdAt' | 'updatedAt'>;
