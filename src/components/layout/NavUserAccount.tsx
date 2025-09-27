'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

import { TPropsWithClassName } from '@/lib/types/react';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { ShieldAlert } from '@/components/shared/Icons';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { isDev } from '@/config';

import { NavUserBlock } from './NavUserBlock';

interface TNavUserAccountProps extends TPropsWithClassName {
  onPrimary?: boolean;
  onSidebar?: boolean;
}

export function NavUserAccount(props: TNavUserAccountProps) {
  const { onPrimary, onSidebar, className } = props;
  const { data: session } = useSession();
  const user = session?.user;
  // const t = useTranslations('NavUserAccount');

  const [open, setOpen] = React.useState(false);
  const closeOuterMenu = React.useCallback(() => setOpen(false), []);

  if (!user) {
    return <div className="bg-muted size-8 animate-pulse rounded-full border" />;
  }

  const isAdmin = user.role === 'ADMIN';

  return (
    <DropdownMenu
      open={open}
      onOpenChange={setOpen}
      // className="__NavUserAccount"
    >
      <DropdownMenuTrigger
        className={cn(
          isDev && '__NavUserAccount_DropdownMenuTrigger', // DEBUG
          className,
          'rounded-full',
          'transition-all',
          'text-theme-foreground/80',
          'opacity-100',
          'cursor-pointer hover:opacity-80',
        )}
      >
        <UserAvatar
          user={user}
          className={cn(
            isDev && '__NavUserAccount_UserAvatar', // DEBUG
            className,
            // 'bg-theme-300/25 size-8 rounded-full',
            // isAdmin && 'border-2 border-solid border-red-400', // Indicate admin role
            // onSidebar && 'flex',
          )}
        />
        {onSidebar && (
          <span className="flex items-center gap-2">
            <span
              className="flex gap-2 font-medium"
              title={isAdmin ? 'Is Administrator' : undefined}
            >
              {user.name || 'anonymous'}
              {isAdmin && <ShieldAlert className="size-4 opacity-50" />}
            </span>
            {user.email && <span className="text-muted-foreground truncate">{user.email}</span>}
          </span>
        )}
      </DropdownMenuTrigger>

      <NavUserBlock
        align="end"
        onPrimary={onPrimary}
        onSidebar={onSidebar}
        closeOuterMenu={closeOuterMenu}
      />
    </DropdownMenu>
  );
}
