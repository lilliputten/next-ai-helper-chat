// import { UserRoles } from '@/shared/types/db/TUserRole';
// import { SidebarNavItem } from '@/shared/types/site/NavItem';

import { UserRoles } from '@/lib/db';
import { SidebarNavItem } from '@/lib/types/site/NavItem';
import {
  BookOpen,
  Dashboard,
  Hand,
  Home,
  Laptop,
  Messages,
  Rocket,
  Settings,
} from '@/components/shared/Icons';

import {
  adminRoute,
  // allTopicsRoute,
  // availableTopicsRoute,
  // chartsRoute,
  dashboardRoute,
  // myTopicsRoute,
  rootRoute,
  settingsRoute,
  startRoute,
  welcomeRoute,
} from './routesConfig';

// TODO: Allow to show generative data (like a topics count) in the sideboard titles (as badges?)

export const sidebarLinks: SidebarNavItem[] = [
  /*
   * {
   *   titleId: 'My Data',
   *   authorizedOnly: true,
   *   items: [
   *     { href: myTopicsRoute, icon: 'topics', titleId: 'My Topics' },
   *     {
   *       href: allTopicsRoute,
   *       icon: 'allTopics',
   *       titleId: 'All Topics',
   *       authorizedOnly: UserRoles.ADMIN,
   *     },
   *     // Add other data links?
   *   ],
   * },
   */
  {
    titleId: 'Application',
    items: [
      // { href: availableTopicsRoute, icon: 'Library', titleId: 'Available Topics' },
      { href: welcomeRoute, icon: Hand, titleId: 'Welcome' },
      { href: startRoute, icon: Rocket, titleId: 'Start', authorizedOnly: true },
      {
        href: adminRoute,
        icon: Laptop,
        titleId: 'Admin Panel',
        authorizedOnly: UserRoles.ADMIN,
        disabled: true,
      },
      { href: dashboardRoute, icon: Dashboard, titleId: 'Dashboard', disabled: true },
      // { href: chartsRoute, icon: 'lineChart', titleId: 'Charts', disabled: true },
    ],
  },
  {
    titleId: 'Options',
    items: [
      { href: settingsRoute, icon: Settings, titleId: 'Settings' },
      { href: rootRoute, icon: Home, titleId: 'Homepage' },
      { href: rootRoute, icon: BookOpen, titleId: 'Documentation', disabled: true },
      {
        href: rootRoute,
        icon: Messages,
        titleId: 'Support',
        authorizedOnly: UserRoles.USER,
        disabled: true,
      },
    ],
  },
];
