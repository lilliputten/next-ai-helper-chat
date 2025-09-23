import { ExtendNullWithUndefined, ReplaceNullWithUndefined } from '@/lib/ts';
import { AllowedUsers } from '@/generated/prisma';

// export type TAllowedUserId = AllowedUsers['id'];
export type TAllowedUser = ExtendNullWithUndefined<AllowedUsers>;
export type TAllowedUserReal = ReplaceNullWithUndefined<AllowedUsers>;
export type TAllowedUserData = Omit<TAllowedUserReal, 'createdAt' | 'updatedAt'>;
