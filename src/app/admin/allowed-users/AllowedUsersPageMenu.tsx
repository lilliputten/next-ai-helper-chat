'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Add, MenuVertical, Refresh, Trash } from '@/components/shared/Icons';
import { isDev } from '@/config';
import { useMediaQuery } from '@/hooks';

interface TAllowedUsersPageMenuProps {
  addAllowedUser: () => void;
  handleRefetch: () => void;
  isRefetching?: boolean;
  handleDeleteSelected: () => void;
  hasSelected?: boolean;
}

export function AllowedUsersPageMenu(props: TAllowedUsersPageMenuProps) {
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);
  const { addAllowedUser, handleRefetch, isRefetching, hasSelected, handleDeleteSelected } = props;
  const mediaQuery = useMediaQuery();
  const { isDesktop } = mediaQuery;
  const closeAndRun = (func: () => void) => {
    setDropdownOpen(false);
    func();
  };
  const menuContent = (
    <div
      className={cn(
        isDev && '__AllowedUsersPageMenu', // DEBUG
        'flex',
        isDesktop ? 'flex-wrap gap-2' : 'w-full flex-col gap-1 p-2',
      )}
    >
      <Button variant="ghost" className="flex gap-2" onClick={() => closeAndRun(addAllowedUser)}>
        <Add className="size-4 opacity-50" />
        <span className="flex flex-1 truncate">Add new</span>
      </Button>
      <Button
        variant="ghost"
        className="flex gap-2"
        disabled={!hasSelected}
        onClick={() => closeAndRun(handleDeleteSelected)}
      >
        <Trash className="size-4 opacity-50" />
        <span className="flex flex-1 truncate">Delete selected</span>
      </Button>
      <Button
        variant="ghost"
        className="flex gap-2"
        disabled={isRefetching}
        onClick={() => closeAndRun(handleRefetch)}
      >
        <Refresh className={cn('size-4 opacity-50', isRefetching && 'animate-spin')} />
        <span className="flex flex-1 truncate">Reload</span>
      </Button>
    </div>
  );
  if (isDesktop) {
    return menuContent;
  }
  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger
        asChild
        aria-label="Show Menu"
        className={cn(
          isDev && '__AllowedUsersPage_DropdownMenuTrigger', // DEBUG
        )}
      >
        <Button size="icon" variant="ghost" title="Show menu">
          <MenuVertical className="size-4 transition-all" />
          <span className="sr-only">Show menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn(
          isDev && '__AllowedUsersPage_DropdownMenuContent', // DEBUG
        )}
      >
        {menuContent}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
