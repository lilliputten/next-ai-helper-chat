'use client';

import React from 'react';

import { rootRoute } from '@/config/routesConfig';
import { generateArray, truncateString } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { useAllowedUsers } from '@/hooks/react-query/useAllowedUsers';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { ScrollAreaInfinite } from '@/components/ui/ScrollAreaInfinite';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { PageEmpty } from '@/components/pages/shared';
import { Add, ArrowLeft, Edit, MenuVertical, SquarePen } from '@/components/shared/Icons';
import { PageError } from '@/components/shared/PageError';
import { isDev } from '@/config';
import { TAllowedUser } from '@/features/allowed-users/types';
import { useGoBack } from '@/hooks';

// const __useDebugData = isDev && false;

interface TProps {
  allowedUsersQuery: ReturnType<typeof useAllowedUsers>;
  selectedUsersState: ReturnType<typeof React.useState<TAllowedUser[]>>;
}

function findSelectedUserIdx(selectedUsers: TAllowedUser[] | undefined, user: TAllowedUser) {
  return selectedUsers ? selectedUsers.findIndex((u) => compareAllowedUsers(u, user)) : -1;
}

function compareAllowedUsers(u1: TAllowedUser, u2: TAllowedUser) {
  if (!u1 || !u2) {
    return false;
  }
  return u1.type === u2.type && u1.value === u2.value;
}

export function AllowedUsersList(props: TProps) {
  const { allowedUsersQuery, selectedUsersState } = props;

  const [selectedUsers, setSelectedIndices] = selectedUsersState;

  // TODO: See RC implementation in the `d:\Work\Me\trainwizzz\trainwizzz\src\components\pages\AvailableTopics\WorkoutQuestion\WorkoutQuestionContainer.tsx`
  const {
    allAllowedUsers,
    error: allowedUsersError,
    isLoading: isAllowedUsersLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = allowedUsersQuery;

  const isAllUsersSelected = (selectedUsers?.length || 0) >= allAllowedUsers.length;

  const isLoadingOverall = isAllowedUsersLoading;

  const goBack = useGoBack(rootRoute);

  // const selectedUserIdx = (user: TAllowedUser) => findSelectedUserIdx(selectedUsers, user);
  const isSelectedUser = (user: TAllowedUser) => findSelectedUserIdx(selectedUsers, user) !== -1;
  const toggleSelectedUser = (user: TAllowedUser) => {
    setSelectedIndices((selectedUsers = []) => {
      const foundIdx = selectedUsers.findIndex((u) => compareAllowedUsers(u, user));
      const isFound = foundIdx !== -1;
      if (!isFound) {
        return selectedUsers.concat(user);
      }
      selectedUsers = [...selectedUsers];
      selectedUsers.splice(foundIdx, 1);
      return selectedUsers;
    });
  };
  const toggleAllSelected = () => {
    if (isAllUsersSelected) {
      setSelectedIndices(undefined);
    } else {
      setSelectedIndices([...allAllowedUsers]);
    }
  };

  if (isLoadingOverall) {
    return (
      <div className="flex flex-col gap-2 p-4">
        {generateArray(3).map((i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    );
  }

  if (allowedUsersError) {
    return <PageError error={allowedUsersError} padded />;
  }

  if (!allAllowedUsers.length) {
    return (
      <PageEmpty
        className="mx-4 flex-1"
        // onButtonClick={openAddTopicModal}
        // buttonTitle="Add Topic"
        // icon={Warning}
        title="No allowed users"
        description="You dont have any records have been created yet. Start adding some."
        buttons={
          <>
            <Button variant="ghost" onClick={goBack} className="flex gap-2">
              <ArrowLeft className="hidden size-4 opacity-50 sm:flex" />
              Go Back
            </Button>
            <Button
              // onClick={openAddTopicModal}
              className="flex gap-2"
            >
              <Add className="hidden size-4 opacity-50 sm:flex" />
              Add Allowed User
            </Button>
          </>
        }
      />
    );
  }

  return (
    <ScrollAreaInfinite
      effectorData={allAllowedUsers}
      isLoading={isLoadingOverall}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      // saveScrollKey="AllowedUsersList"
      // saveScrollHash={saveScrollHash}
      className={cn(
        isDev && '__AllowedUsersList', // DEBUG
        'relative flex w-full flex-1 flex-col overflow-hidden',
      )}
      viewportClassName={cn(
        isDev && '__AllowedUsersList_Viewport', // DEBUG
        'relative flex flex-1 flex-col',
        '[&>div]:gap-4 [&>div]:flex-col',
      )}
      containerClassName={cn(
        isDev && '__AllowedUsersList_Container', // DEBUG
        'relative flex flex-col gap-4 px-4',
      )}
    >
      <Table
        className={cn(
          isDev && '__AllowedUsersList_ListTable', // DEBUG
          'w-full table-fixed',
          // 'flex flex-col flex-wrap items-center gap-2 px-4 py-2',
        )}
      >
        <TableHeader>
          <TableRow>
            <TableHead
              id="checkbox"
              // className="hover:bg-primary-500/10 w-[4em] text-center transition"
              className="hover:[&>button]:ring-primary-500/50 w-[4em] text-center transition hover:cursor-pointer hover:[&>button]:ring-2"
              onClick={toggleAllSelected}
            >
              <Checkbox checked={isAllUsersSelected} className="block" />
            </TableHead>
            <TableHead id="no" className="w-[4em] text-right max-sm:hidden">
              No
            </TableHead>
            <TableHead id="type" className="w-[40%] truncate">
              Type
            </TableHead>
            <TableHead id="name" className="w-[50%] truncate">
              Name
            </TableHead>
            <TableHead id="actions" className="w-[4em]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAllowedUsers.map((allowedUser, idx) => {
            const { type, value } = allowedUser;
            const key = [type, value].join('-');
            return (
              <TableRow key={key} className="">
                <TableCell
                  id="checkbox"
                  className="hover:[&>button]:ring-primary-500/50 w-[4em] text-center transition hover:cursor-pointer hover:[&>button]:ring-2"
                  onClick={() => toggleSelectedUser(allowedUser)}
                >
                  <Checkbox className="block" checked={isSelectedUser(allowedUser)} />
                </TableCell>
                <TableCell id="no" className="truncate text-right opacity-50 max-sm:hidden">
                  {idx + 1}
                </TableCell>
                <TableCell id="type" className="truncate">
                  {truncateString(allowedUser.type, 40)}
                </TableCell>
                <TableCell id="value" className="truncate">
                  {truncateString(allowedUser.value, 100)}
                </TableCell>
                <TableCell id="actions" className="w-[2em] text-right">
                  <Button variant="ghost" className="flex gap-2" size="icon">
                    <SquarePen className="size-4 opacity-50" />
                    <span className="sr-only flex flex-1 truncate">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </ScrollAreaInfinite>
  );
}
