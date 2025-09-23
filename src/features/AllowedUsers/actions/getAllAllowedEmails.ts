'use server';

import { getAllowedUsers } from '@/features/AllowedUsers/actions/getAllowedUsers';
import { AllowedUsersTypes } from '@/features/AllowedUsers/types/AllowedUsersType';

export async function getAllAllowedEmails() {
  const allowedUsers = await getAllowedUsers({ where: { type: AllowedUsersTypes.email } });
  return allowedUsers.map(({ value }) => value);
}
