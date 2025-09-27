'use client';

import React from 'react';
import { toast } from 'sonner';

import { ErrorLike } from '@/lib/errors';
import { getErrorText } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { useAllowedUsers } from '@/hooks/react-query/useAllowedUsers';
import { ConfirmModal } from '@/components/ui-atoms';
import { isDev } from '@/config';
import { addAllowedUser } from '@/features/allowed-users/actions/addAllowedUser';
import { deleteAllowedUsers } from '@/features/allowed-users/actions/deleteAllowedUsers';
import { updateAllowedUser } from '@/features/allowed-users/actions/updateAllowedUser';
import { TAllowedUser, TNewOrExistedAllowedUser } from '@/features/allowed-users/types';

import { AllowedUserEditModal } from './AllowedUserEditModal';
import { AllowedUsersList } from './AllowedUsersList';
import { AllowedUsersPageMenu } from './AllowedUsersPageMenu';

const __useDebugData = isDev && false;

export function AllowedUsersPage() {
  const [editingAllowedUser, setEditingAllowedUser] = React.useState<TAllowedUser | undefined>();
  const [isEditModalVisible, setEditModalVisible] = React.useState(false);
  const [editError, setEditError] = React.useState<ErrorLike>();
  const [isSaving, startSaving] = React.useTransition();
  const [isDeleting, setDeleting] = React.useState(false);

  const [isConfirmDeleteModalVisible, setConfirmDeleteModalVisible] = React.useState(false);

  const allowedUsersQuery = useAllowedUsers({ orderBy: [{ type: 'asc' }, { value: 'asc' }] });
  const {
    //
    refetch,
    isRefetching,
    isLoading: isAllowedUsersLoading,
  } = allowedUsersQuery;
  const selectedUsersState = React.useState<TAllowedUser[]>();
  const [selectedUsers, setSelectedUsers] = selectedUsersState;

  const handleRefetch = () => {
    return refetch().then(() => {
      setSelectedUsers(undefined);
    });
  };

  const handleDeleteSelected = () => {
    if (!selectedUsers?.length) {
      return Promise.reject(new Error('No selected records'));
    }
    setDeleting(true);
    const ids = selectedUsers.map(({ id }) => id);
    return deleteAllowedUsers(ids)
      .then((result) => {
        /* console.log('[AllowedUsersPage:handleCreateOrUpdateUser] Deletion finished', {
         *   ids,
         *   result,
         *   selectedUsers,
         * });
         */
        setEditModalVisible(false);
        setEditingAllowedUser(undefined);
        allowedUsersQuery.deleteAllowedUsers(ids);
        allowedUsersQuery.invalidateAllKeysExcept([allowedUsersQuery.queryKey]);
        setSelectedUsers(undefined);
        return result;
      })
      .catch((error) => {
        const errMsg = ['Deletion of the allowed users failed', getErrorText(error)]
          .filter(Boolean)
          .join(': ');
        // eslint-disable-next-line no-console
        console.error('[StartBotPage:sendSetCommandsRequest]', errMsg, {
          error,
          selectedUsers,
        });
        debugger; // eslint-disable-line no-debugger
        toast.error(errMsg);
        throw error;
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  const confirmDeleteSelected = () => {
    setConfirmDeleteModalVisible(true);
  };

  const handleAddAllowedUser = () => {
    setEditingAllowedUser(undefined);
    setEditModalVisible(true);
  };

  // UNUSED: We don't have ids, so, its' impossible to update data
  const editAllowedUser = (allowedUser: TAllowedUser) => {
    setEditingAllowedUser(allowedUser);
    setEditModalVisible(true);
  };

  const handleCreateOrUpdateUser = (allowedUser: TNewOrExistedAllowedUser) => {
    return new Promise<TAllowedUser>((resolve, reject) => {
      startSaving(async () => {
        try {
          const isNew = !allowedUser.id;
          const promise = isNew
            ? addAllowedUser(allowedUser)
            : updateAllowedUser(allowedUser as TAllowedUser);
          toast.promise(promise, {
            loading: 'Saving allowed user data...',
            success: 'Data successfully saved.',
            error: 'Creation of the allowed user failed.',
          });
          const updatedUser = await promise;
          /* console.log('[AllowedUsersPage:handleCreateOrUpdateUser] Edit finished', {
           *   isNew,
           *   queryKey: allowedUsersQuery.queryKey,
           *   updatedUser,
           *   allowedUser,
           * });
           */
          setEditModalVisible(false);
          setEditingAllowedUser(undefined);
          if (isNew) {
            allowedUsersQuery.addNewAllowedUser(updatedUser);
          } else {
            allowedUsersQuery.updateAllowedUser(updatedUser);
          }
          allowedUsersQuery.invalidateAllKeysExcept([allowedUsersQuery.queryKey]);
          resolve(updatedUser);
        } catch (error) {
          const errMsg = ['Creation of the allowed user failed', getErrorText(error)]
            .filter(Boolean)
            .join(': ');
          // eslint-disable-next-line no-console
          console.error('[StartBotPage:sendSetCommandsRequest]', errMsg, {
            error,
            allowedUser,
          });
          debugger; // eslint-disable-line no-debugger
          setEditError(errMsg);
          // toast.error(errMsg);
          // throw error;
          reject(error);
        }
      });
    });
  };

  const isPending = isDeleting || isSaving || isRefetching || isAllowedUsersLoading;

  return (
    <div
      className={cn(
        isDev && '__AllowedUsersPage', // DEBUG
        'mx-auto flex w-full max-w-5xl flex-1 flex-col overflow-hidden py-4 transition',
        isPending && 'opacity-50',
      )}
    >
      <div className="flex flex-col gap-4 px-4 py-4">
        <div className="flex">
          <h1 className="flex-1 truncate text-2xl">Allowed Users List</h1>
          <AllowedUsersPageMenu
            addAllowedUser={handleAddAllowedUser}
            handleRefetch={handleRefetch}
            isRefetching={isRefetching}
            hasSelected={!!selectedUsers?.length}
            handleDeleteSelected={confirmDeleteSelected}
          />
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
          handleConfirm={handleCreateOrUpdateUser}
          handleClose={() => {
            setEditModalVisible(false);
            setEditingAllowedUser(undefined);
          }}
          error={editError}
        />
      )}
      {isConfirmDeleteModalVisible && (
        <ConfirmModal
          dialogTitle="Confirm Delete Selected Users"
          confirmButtonVariant="destructive"
          confirmButtonText="Delete"
          confirmButtonBusyText="Deleting"
          cancelButtonText="Cancel"
          handleClose={() => setConfirmDeleteModalVisible(false)}
          handleConfirm={() => {
            setConfirmDeleteModalVisible(false);
            handleDeleteSelected();
          }}
          // isPending={isPending}
          isVisible={isConfirmDeleteModalVisible}
        >
          Do you confirm deleting the selected users?
        </ConfirmModal>
      )}
    </div>
  );
}
