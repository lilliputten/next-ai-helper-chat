'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { useAllowedUsers } from '@/hooks/react-query/useAllowedUsers';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Add, Edit, FlaskConical, MenuVertical } from '@/components/shared/Icons';
import { ConfirmModal } from '@/components/ui-atoms';
import { isDev } from '@/config';
import { TAllowedUser } from '@/features/allowed-users/types';
import { useMediaQuery } from '@/hooks';

import { AllowedUsersList } from './AllowedUsersList';

const __useDebugData = isDev && false;

function AllowedUsersPageMenu() {
  const mediaQuery = useMediaQuery();
  const { isDesktop } = mediaQuery;
  const menuContent = (
    <div
      className={cn(
        isDev && '__AllowedUsersPageMenu', // DEBUG
        'flex',
        isDesktop ? 'flex-wrap gap-2' : 'w-full flex-col gap-1 p-2',
      )}
    >
      <Button variant="ghost" className="flex gap-2">
        <Add className="size-4 opacity-50" />
        <span className="flex flex-1 truncate">Add new</span>
      </Button>
      <Button variant="ghost" className="flex gap-2">
        <Edit className="size-4 opacity-50" />
        <span className="flex flex-1 truncate">Edit</span>
      </Button>
    </div>
  );
  if (isDesktop) {
    return menuContent;
  }
  return (
    <DropdownMenu>
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

export function AllowedUsersPage() {
  const [isModalVisible, setModalVisible] = React.useState(false);

  const allowedUsersQuery = useAllowedUsers({ orderBy: [{ type: 'asc' }, { value: 'asc' }] });
  const selectedUsersState = React.useState<TAllowedUser[]>();
  // const [selectedUsers, setSelectedIndices] = selectedUsersState;

  return (
    <div
      className={cn(
        isDev && '__AllowedUsersPage', // DEBUG
        'mx-auto flex w-full max-w-5xl flex-1 flex-col overflow-hidden py-4',
      )}
    >
      <div className="flex flex-col gap-4 px-4 py-4">
        <div className="flex">
          <h1 className="flex-1 truncate text-2xl">Allowed Users List</h1>
          <AllowedUsersPageMenu />
        </div>
        {__useDebugData && (
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-red-500 px-3 py-1.5 text-xs text-white">
              <span className="font-bold">DEBUG MODE</span>{' '}
              <span className="opacity-70">The fake local data will be returned</span>
            </span>
          </div>
        )}
      </div>
      <AllowedUsersList
        selectedUsersState={selectedUsersState}
        allowedUsersQuery={allowedUsersQuery}
      />
      {/* <DialogDemo /> */}
      <ConfirmModal
        dialogTitle="Confirm delete answer"
        confirmButtonVariant="destructive"
        confirmButtonText="Delete"
        confirmButtonBusyText="Deleting"
        cancelButtonText="Cancel"
        handleClose={() => setModalVisible(false)}
        handleConfirm={() => {
          setModalVisible(false);
        }}
        // isPending={isLoadingOverall}
        isVisible={isModalVisible}
      >
        Do you confirm deleting the answer?
      </ConfirmModal>
      <div
        className={cn(
          isDev && '__AllowedUsersPageActions', // DEBUG
          'flex flex-wrap items-center gap-2 px-4 py-2',
        )}
      >
        <Button
          onClick={() => setModalVisible(true)}
          className="flex flex-1 gap-2"
          variant="primary"
        >
          <FlaskConical className="size-4 opacity-50" />
          <span className="truncate">Show Modal</span>
        </Button>
      </div>
    </div>
  );
}
