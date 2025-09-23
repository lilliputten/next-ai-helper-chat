'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { useAllowedUsers } from '@/hooks/react-query/useAllowedUsers';
import { Button } from '@/components/ui/Button';
import { FlaskConical } from '@/components/shared/Icons';
import { ConfirmModal } from '@/components/ui-atoms';
import { isDev } from '@/config';

import { AllowedUsersList } from './AllowedUsersList';

const __useDebugData = isDev && false;

export function AllowedUsersPage() {
  const [isModalVisible, setModalVisible] = React.useState(false);

  const allowedUsersQuery = useAllowedUsers();

  return (
    <div
      // onSubmit={onSubmit}
      className={cn(
        isDev && '__AllowedUsersPage', // DEBUG
        'mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-hidden py-4',
      )}
    >
      <div className="flex flex-col gap-4 px-4 py-4">
        <h1 className="text-2xl">Allowed Users List</h1>
        {__useDebugData && (
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-red-500 px-3 py-1.5 text-xs text-white">
              <span className="font-bold">DEBUG MODE</span>{' '}
              <span className="opacity-70">The fake local data will be returned</span>
            </span>
          </div>
        )}
      </div>
      <div
        className={cn(
          isDev && '__AllowedUsersPage_Actions', // DEBUG
          'flex flex-wrap items-center gap-2 px-4 py-2',
        )}
      >
        {/* initWebhook
        <Button
          disabled={isInitWebhookRunning}
          // onClick={initWebhook}
          variant="theme"
          className="flex gap-2"
        >
          <InitWebhookIcon
            className={cn('size-4 opacity-50', isInitWebhookRunning && 'animate-spin')}
          />
          <span className="truncate">Initialize webhook</span>
        </Button>
        */}
      </div>
      <AllowedUsersList allowedUsersQuery={allowedUsersQuery} />
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
