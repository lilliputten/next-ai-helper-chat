export const authErrorRoute = '/auth/error';
export const adminAllowedUsersRoute = '/admin/allowed-users';
export const adminRoute = '/admin';
export const contactsRoute = '/contacts';
export const dashboardRoute = '/dashboard';
export const infoRoute = '/info';
export const rootRoute = '/';
export const settingsRoute = '/settings';
export const startRoute = '/start';
export const testImageQueryRoute = '/test/image-query';
export const testTextQueryRoute = '/test/text-query';
export const welcomeRoute = '/welcome';

/** NOTE: That's used only to mock real intl context */
export const pathnames = {
  [adminRoute]: adminRoute,
  [contactsRoute]: contactsRoute,
  [dashboardRoute]: dashboardRoute,
  [infoRoute]: infoRoute,
  [rootRoute]: rootRoute,
  [settingsRoute]: settingsRoute,
  [startRoute]: adminRoute,
  [testImageQueryRoute]: testImageQueryRoute,
  [testTextQueryRoute]: testTextQueryRoute,
  [welcomeRoute]: welcomeRoute,
};

export type TRoutePathKey = keyof typeof pathnames;
export type TRoutePath = string; // keyof typeof pathnames;
