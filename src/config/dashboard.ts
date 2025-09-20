// import { UserRoles } from '@/shared/types/db/TUserRole';
// import { SidebarNavItem } from '@/shared/types/site/NavItem';

import { FlaskConical } from 'lucide-react';

import { UserRoles } from '@/lib/db';
import { SidebarNavItem } from '@/lib/types/site/NavItem';
import {
  AtSign,
  BookOpen,
  Hand,
  Laptop,
  Messages,
  Rocket,
  Settings,
  Users,
} from '@/components/shared/Icons';

import {
  adminAllowedUsersRoute,
  adminRoute,
  // allTopicsRoute,
  // availableTopicsRoute,
  // chartsRoute,
  // dashboardRoute,
  // myTopicsRoute,
  rootRoute,
  settingsRoute,
  startRoute,
  testImageQueryRoute,
  testTextQueryRoute,
  welcomeRoute,
} from './routesConfig';

// TODO: Allow to show generative data (like a topics count) in the sideboard titles (as badges?)

// prettier-ignore
export const sidebarLinks: SidebarNavItem[] = [
  /* // Data
   * {
   *   titleId: 'My Data',
   *   authorizedOnly: true,
   *   items: [
   *     { href: myTopicsRoute, icon: 'topics', titleId: 'My Topics' },
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
      { href: testTextQueryRoute, icon: FlaskConical, titleId: 'Test Text Query', authorizedOnly: true },
      { href: testImageQueryRoute, icon: FlaskConical, titleId: 'Test Image Query', authorizedOnly: true },
    ],
  },
  {
    titleId: 'Configuration',
    authorizedOnly: UserRoles.ADMIN,
    items: [
      { href: adminAllowedUsersRoute, icon: Users, titleId: 'Allowed Users', disabled: true },
      { href: adminRoute, icon: Laptop, titleId: 'Admin Panel', authorizedOnly: UserRoles.ADMIN, disabled: true },
    ],
  },
  {
    titleId: 'Project',
    items: [
      { href: settingsRoute, icon: Settings, titleId: 'Settings', disabled: true },
      { href: rootRoute, icon: BookOpen, titleId: 'Documentation', disabled: true },
      { href: rootRoute, icon: Messages, titleId: 'Support', disabled: true },
      { href: rootRoute, icon: AtSign, titleId: 'Contacts', disabled: true },
    ],
  },
];
