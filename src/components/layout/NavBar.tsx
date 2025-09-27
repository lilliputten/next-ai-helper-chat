'use client';

// import { useLocale, useTranslations } from 'next-intl';
import { siteMenu } from '@/config/siteMenu';
import { commonXMarginTwStyle, commonXPaddingTwStyle } from '@/config/ui';
// import { getAllRouteSynonyms } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { NavUserAuthButton } from '@/components/layout/NavAuthButton';
import { NavBarBrand } from '@/components/layout/NavBarBrand';
// import { NavLocaleSwitcher } from '@/components/layout/NavLocaleSwitcher';
import { NavModeToggle } from '@/components/layout/NavModeToggle';
import { Menu } from '@/components/shared/Icons';
import { isDev } from '@/config';
import { Link, usePathname } from '@/i18n/routing';

interface NavBarProps {
  large?: boolean;
  isUser: boolean;
  open: boolean;
  setOpen: (p: boolean) => void;
}

export function NavBar(props: NavBarProps) {
  const { isUser, open, setOpen } = props;
  const links = siteMenu.mainNav;
  const t = (s: string) => s; // useTranslations('SiteMenu');
  // const locale = useLocale() as TLocale;
  const pathname = decodeURI(usePathname());
  return (
    <header
      className={cn(
        isDev && '__NavBar', // DEBUG
        'sticky',
        'top-0',
        'z-40',
        'flex',
        'w-full',
        'bg-theme',
        commonXPaddingTwStyle,
        'justify-stretch',
        'transition-all',
      )}
    >
      <div // Ex: MaxWidthWrapper
        className={cn(
          // prettier-ignore
          isDev && '__NavBar_Wrapper', // DEBUG
          'flex',
          'w-full',
          'items-center',
          'justify-between',
          // 'max-sm:justify-center',
          'py-2',
          'z-10',
        )}
        // large={large}
      >
        <NavBarBrand isUser={isUser} />

        {links && links.length > 0 ? (
          <nav className="hidden gap-2 md:flex">
            {links
              .filter((item) => !item.userRequiredOnly || isUser)
              .map((item) => {
                const { icon: Icon } = item;
                // Check if it's current item using `getAllRouteSynonyms(item.href, locale)`
                const allHrefs = [item.href]; // getAllRouteSynonyms(item.href, locale);
                const isCurrent = allHrefs.includes(pathname);
                const isDisabled = !!item.disabled || isCurrent;
                return (
                  <Link
                    key={'navbar-' + item.href}
                    href={item.href}
                    prefetch
                    className={cn(
                      'flex gap-2',
                      'items-center',
                      'text-lg',
                      'font-medium',
                      'transition-all',
                      'text-theme-foreground',
                      'rounded',
                      'px-4 py-2',
                      'opacity-100',
                      'hover:bg-theme-400/50',
                      'sm:text-sm',
                      isCurrent && 'border border-white/20',
                      isDisabled && 'disabled',
                    )}
                  >
                    {Icon && <Icon className="size-4" />}
                    {t(item.titleId)}
                  </Link>
                );
              })}
          </nav>
        ) : null}

        <div
          className={cn(
            isDev && '__NavBar_Right', // DEBUG
            'items-center space-x-3',
            'hidden',
            'md:flex',
          )}
        >
          {/* Right header for extra stuff */}
          {/* TODO: Put signin button
          <NavTgSignInButton />
          */}
          <NavModeToggle onPrimary />
          {/* <NavLocaleSwitcher onPrimary /> */}
          <NavUserAuthButton isUser={isUser} onPrimary />
        </div>

        {/* Mobile panel toggler icon */}
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            isDev && '__NavBar_MobilePanelToggler', // DEBUG
            'cursor-pointer rounded-full p-2',
            commonXMarginTwStyle,
            'transition-all',
            'duration-200',
            'text-theme-foreground hover:bg-theme-400/50',
            'focus:outline-none',
            'active:bg-theme-300',
            'md:hidden',
            open && 'hover:bg-theme-400 opacity-50',
          )}
        >
          <Menu className="text-theme-foreground size-5" />
        </button>
      </div>
    </header>
  );
}
