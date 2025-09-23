'use client';

import React from 'react';

import { generateArray } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { useAllowedUsers } from '@/hooks/react-query/useAllowedUsers';
import { Skeleton } from '@/components/ui/Skeleton';
import { PageError } from '@/components/shared/PageError';
import { isDev } from '@/config';

// const __useDebugData = isDev && false;

interface TProps {
  allowedUsersQuery: ReturnType<typeof useAllowedUsers>;
}

export function AllowedUsersList(props: TProps) {
  const { allowedUsersQuery } = props;

  // TODO: See RC implementation in the `d:\Work\Me\trainwizzz\trainwizzz\src\components\pages\AvailableTopics\WorkoutQuestion\WorkoutQuestionContainer.tsx`
  const {
    allAllowedUsers,
    error: allowedUsersError,
    isLoading: isAllowedUsersLoading,
  } = allowedUsersQuery;

  const isLoadingOverall = isAllowedUsersLoading;

  if (isLoadingOverall) {
    return (
      <div className="flex flex-col gap-2 p-4">
        {generateArray(2).map((i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    );
  }

  if (allowedUsersError) {
    return <PageError error={allowedUsersError} padded />;
  }

  return (
    <div
      className={cn(
        isDev && '__AllowedUsersList_List', // DEBUG
        'flex flex-col flex-wrap items-center gap-2 px-4 py-2',
      )}
    >
      {allAllowedUsers.map((allowedUser) => {
        const { type, value } = allowedUser;
        const key = [type, value].join('-');
        return (
          <div key={key}>
            {type}: {value}
          </div>
        );
      })}
    </div>
  );
}
