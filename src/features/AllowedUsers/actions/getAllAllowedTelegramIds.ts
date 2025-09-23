'use server';

import { getAllowedUsers } from '@/features/AllowedUsers/actions/getAllowedUsers';
import { AllowedUsersTypes } from '@/features/AllowedUsers/types/AllowedUsersType';

export async function getAllAllowedTelegramIds() {
  const allowedUsers = await getAllowedUsers({ where: { type: AllowedUsersTypes.telegram } });
  return allowedUsers.map(({ value }) => Number(value));
}
