'use client';

import { usePathname } from 'next/navigation';

import { startRoute, welcomeRoute } from '@/config/routesConfig';
import { TPropsWithChildrenAndClassName } from '@/lib/types/react';
// import { getAllRouteSynonyms } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/shared/Logo';
import { isDev, siteTitle } from '@/config';
import { Link } from '@/i18n/routing';

// import { TLocale } from '@/i18n/types';

interface NavBarBrandProps {
  isUser?: boolean;
  onSidebar?: boolean;
}

function BrandWrapper(props: TPropsWithChildrenAndClassName & NavBarBrandProps) {
  const { isUser, children, className: parentClassName } = props;
  // const locale = useLocale() as TLocale;
  const pathname = decodeURI(usePathname() || '');
  const rootRoute = isUser ? startRoute : welcomeRoute;
  const rootRoutesList = [rootRoute]; // getAllRouteSynonyms(rootRoute, locale);
  const isRoot = !pathname || rootRoutesList.includes(pathname);
  const className = cn(
    isDev && '__BrandWrapper', // DEBUG
    parentClassName,
    'flex',
    'items-center',
    'space-x-1.5',
    'gap-2',
    'transition-all',
    'mr-10',
    'select-none',
    !isRoot && 'hover:opacity-80',
  );
  if (isRoot) {
    return <div className={className}>{children}</div>;
  }
  return (
    <Link href={rootRoute} className={className}>
      {children}
    </Link>
  );
}

export function NavBarBrand(props: NavBarBrandProps) {
  const { onSidebar } = props;
  return (
    <BrandWrapper {...props} className="h-12">
      <Logo className="size-16" />
      <h1
        role="heading"
        data-testid="NavBarBrandTitle"
        className={cn(
          'font-urban',
          'text-xl',
          !onSidebar && 'text-theme-foreground',
          'font-bold',
          'whitespace-nowrap',
          'overflow-hidden',
          'text-ellipsis',
        )}
      >
        {siteTitle}
      </h1>
    </BrandWrapper>
  );
}
