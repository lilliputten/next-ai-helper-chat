'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { useAllowedUsers } from '@/hooks/react-query/useAllowedUsers';
import { isDev } from '@/config';
import { TAllowedUser } from '@/features/allowed-users/types';

import { AllowedUserEditModal } from './AllowedUserEditModal';
import { AllowedUsersList } from './AllowedUsersList';
import { AllowedUsersPageMenu } from './AllowedUsersPageMenu';

const __useDebugData = isDev && false;

export function AllowedUsersPage() {
  const [isEditModalVisible, setEditModalVisible] = React.useState(false);
  const [editingAllowedUser, setEditingAllowedUser] = React.useState<TAllowedUser | undefined>();

  const allowedUsersQuery = useAllowedUsers({ orderBy: [{ type: 'asc' }, { value: 'asc' }] });
  const selectedUsersState = React.useState<TAllowedUser[]>();
  // const [selectedUsers, setSelectedIndices] = selectedUsersState;

  const editAllowedUser = (allowedUser: TAllowedUser) => {
    setEditingAllowedUser(allowedUser);
    setEditModalVisible(true);
  };

  const addAllowedUser = () => {
    setEditingAllowedUser(undefined);
    setEditModalVisible(true);
  };

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
          <AllowedUsersPageMenu addAllowedUser={addAllowedUser} />
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
        editAllowedUser={editAllowedUser}
      />
      {isEditModalVisible && (
        <AllowedUserEditModal
          initialAllowedUser={editingAllowedUser}
          handleConfirm={(allowedUser) => {
            console.log('[AllowedUsersPage] Edit finished', {
              allowedUser,
            });
            debugger;
          }}
          handleClose={() => {
            setEditModalVisible(false);
            setEditingAllowedUser(undefined);
          }}
        />
      )}
      {/*
      <ConfirmModal
        dialogTitle="Confirm delete answer"
        confirmButtonVariant="destructive"
        confirmButtonText="Delete"
        confirmButtonBusyText="Deleting"
        cancelButtonText="Cancel"
        handleClose={() => setEditModalVisible(false)}
        handleConfirm={() => {
          setEditModalVisible(false);
        }}
        // isPending={isLoadingOverall}
        isVisible={isEditModalVisible}
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
          onClick={() => setEditModalVisible(true)}
          className="flex flex-1 gap-2"
          variant="primary"
        >
          <FlaskConical className="size-4 opacity-50" />
          <span className="truncate">Show Modal</span>
        </Button>
      </div>
      */}
    </div>
  );
}
