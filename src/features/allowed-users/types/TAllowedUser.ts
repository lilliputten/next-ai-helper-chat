import { ExtendNullWithUndefined, ReplaceNullWithUndefined } from '@/lib/ts';
import { AllowedUser } from '@/generated/prisma';

import { TAllowedUserType } from './AllowedUserType';

type CoercedAllowedUser = Omit<AllowedUser, 'type'> & { type: TAllowedUserType };

// export type TAllowedUserId = AllowedUser['id'];
export type TAllowedUser = ExtendNullWithUndefined<CoercedAllowedUser>;
export type TAllowedUserReal = ReplaceNullWithUndefined<CoercedAllowedUser>;
export type TAllowedUserData = Omit<TAllowedUserReal, 'createdAt' | 'updatedAt'>;
