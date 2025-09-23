export const AllowedUsersTypes = {
  email: 'EMAIL',
  telegram: 'TELEGRAM',
} as const;
export type TAllowedUsersType = (typeof AllowedUsersTypes)[keyof typeof AllowedUsersTypes];
export const defaultAllowedUsersType: TAllowedUsersType = AllowedUsersTypes.email;
