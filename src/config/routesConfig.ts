// export const allTopicsRoute = '/topics/all';
// export const availableTopicsRoute = '/topics/available'; // Example
// export const chartsRoute = '/charts';
// export const myTopicsRoute = '/topics/my';
export const adminRoute = '/admin';
export const dashboardRoute = '/dashboard';
export const infoRoute = '/info';
export const rootRoute = '/';
export const settingsRoute = '/settings';
export const startRoute = '/start';
export const welcomeRoute = '/welcome';

/** NOTE: That's used only to mock real intl context */
export const pathnames = {
  // [allTopicsRoute]: allTopicsRoute,
  // [availableTopicsRoute]: availableTopicsRoute,
  // [chartsRoute]: chartsRoute,
  // [myTopicsRoute]: myTopicsRoute,
  [adminRoute]: adminRoute,
  [dashboardRoute]: dashboardRoute,
  [infoRoute]: infoRoute,
  [rootRoute]: rootRoute,
  [settingsRoute]: settingsRoute,
  [startRoute]: adminRoute,
  [welcomeRoute]: welcomeRoute,
};

export type TRoutePathKey = keyof typeof pathnames;
export type TRoutePath = string; // keyof typeof pathnames;
