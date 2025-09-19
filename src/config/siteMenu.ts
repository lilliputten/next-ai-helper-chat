import { MainNavItem } from '@/lib/types/site/NavItem';
import { Hand, Rocket } from '@/components/shared/Icons';

import { startRoute, welcomeRoute } from './routesConfig';

export type SiteMenu = {
  mainNav: MainNavItem[];
};

export const siteMenu: SiteMenu = {
  // TODO: See `src/config/dashboard.ts`
  mainNav: [
    {
      titleId: 'Welcome',
      href: welcomeRoute,
      icon: Hand,
    },
    {
      userRequiredOnly: true,
      titleId: 'Start',
      icon: Rocket,
      href: startRoute,
    },
  ],
};
