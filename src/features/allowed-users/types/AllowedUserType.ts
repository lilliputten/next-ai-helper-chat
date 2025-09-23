export const AllowedUserTypes = {
  email: 'EMAIL',
  telegram: 'TELEGRAM',
} as const;
export type TAllowedUserType = (typeof AllowedUserTypes)[keyof typeof AllowedUserTypes];
export const defaultAllowedUserType: TAllowedUserType = AllowedUserTypes.email;
