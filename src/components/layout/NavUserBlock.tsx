'use client';

import { signOut, useSession } from 'next-auth/react';

import { settingsRoute } from '@/config/routesConfig';
import { cn } from '@/lib/utils';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu';
import { LayoutDashboard, LogOut, Settings, ShieldAlert } from '@/components/shared/Icons';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { isDev } from '@/config';
import { Link } from '@/i18n/routing';

import { SidebarMenuItem, SidebarWrapper, TSidebarBlockProps } from './SidebarComponents';

export function NavUserBlock(props: TSidebarBlockProps) {
  const {
    // onPrimary,
    onSidebar,
    className,
    align,
    closeOuterMenu,
  } = props;
  const { data: session } = useSession();
  const user = session?.user;
  const t = (s: string) => s; // useTranslations('NavUserAccount');

  if (!user) {
    return null;
  }

  const Wrapper = onSidebar ? SidebarWrapper : DropdownMenuContent;
  const MenuItem = onSidebar ? SidebarMenuItem : DropdownMenuItem;

  const isAdmin = user.role === 'ADMIN';

  return (
    <Wrapper
      align={align}
      className={cn(
        isDev && '__NavUserBlock', // DEBUG
        className,
      )}
    >
      <div
        className={cn(
          isDev && '__NavUserBlock_UserName', // DEBUG
          'flex items-center justify-start gap-3',
          !onSidebar && 'px-2',
        )}
      >
        {onSidebar && (
          <UserAvatar
            user={{ name: user.name || null, image: user.image || null }}
            className={cn(
              isDev && '__NavUserBlock_UserAvatar', // DEBUG
              className,
              'bg-theme-300/25 size-8 rounded-full',
              isAdmin && 'border-2 border-solid border-lime-400', // Indicate admin role
              onSidebar && 'flex',
            )}
          />
        )}
        <div className="flex flex-col space-y-1 leading-none">
          <p
            className="flex items-center gap-2 font-medium"
            title={isAdmin ? 'Is Administrator' : undefined}
          >
            {user.name || 'anonymous'}
            {isAdmin && <ShieldAlert className="size-4 opacity-50" />}
          </p>
          {user.email && (
            <p className="text-muted-foreground w-[200px] truncate text-sm">{user.email}</p>
          )}
        </div>
      </div>

      <DropdownMenuSeparator />

      {/*isAdmin && (
      <MenuItem asChild>
        <Link
          href="/admin"
          className={cn(
            'flex items-center space-x-2.5',
            'disabled', // UNUSED
          )}
        >
          <Lock className="size-4" />
          <p className="text-sm">{t('Admin')}</p>
        </Link>
      </MenuItem>
      )*/}

      {!onSidebar && (
        <>
          <MenuItem
            asChild
            className="hover:bg-theme-500 cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:text-white"
          >
            <Link
              href="/" // dashboard
              className={cn(
                'flex items-center space-x-2.5',
                'disabled', // UNUSED
              )}
            >
              <LayoutDashboard className="size-4" />
              <p className="text-sm">{t('Dashboard')}</p>
            </Link>
          </MenuItem>

          <MenuItem
            asChild
            className="hover:bg-theme-500 cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:text-white"
          >
            <Link
              href={settingsRoute}
              className={cn(
                'flex items-center space-x-2.5',
                // 'disabled', // UNUSED
              )}
            >
              <Settings className="size-4" />
              <p className="text-sm">{t('Settings')}</p>
            </Link>
          </MenuItem>

          <DropdownMenuSeparator />
        </>
      )}

      <MenuItem
        className="hover:bg-theme-500 cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:text-white"
        onSelect={(event) => {
          event.preventDefault();
          closeOuterMenu?.();
          signOut({
            callbackUrl: `${window.location.origin}/`,
          });
        }}
      >
        <div className="flex items-center space-x-2.5">
          <LogOut className="size-4" />
          <p className="text-sm">{t('Log out')}</p>
        </div>
      </MenuItem>
    </Wrapper>
  );
}
