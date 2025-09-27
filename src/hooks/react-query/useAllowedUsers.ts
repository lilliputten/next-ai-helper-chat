'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { getErrorText } from '@/lib/helpers';
import {
  addNewItemToQueryCache,
  deleteItemFromQueryCache,
  deleteItemsFromQueryCache,
  getUnqueItemsList,
  invalidateAllUsedKeysExcept,
  stringifyQueryKey,
  updateItemInQueryCache,
} from '@/lib/helpers/react-query';
import { composeQueryHash } from '@/lib/helpers/urls';
import { TAllowedUserResultsQueryData, TAllUsedKeys } from '@/lib/types/react-query';
import { TGetAllowedUserParams, TGetAllowedUserResults } from '@/lib/zod-schemas';
import { minuteMs } from '@/constants';
import { getAllowedUsersResults } from '@/features/allowed-users/actions';
import { itemsLimit } from '@/features/allowed-users/constants';
import { TAllowedUser, TAllowedUserId } from '@/features/allowed-users/types';

const staleTime = minuteMs * 10;

// TODO: Register all the query keys

interface TUseAllowedUserProps extends Omit<TGetAllowedUserParams, 'skip' | 'take'> {
  enabled?: boolean;
}

/** Collection of the all used query keys (mb, already invalidated).
 *
 * TODO:
 * - Use `QueryCache.subscribe` to remove invalidated keys?
 * - Create a helper to invalidate all the keys or all the keys, except current?
 */
const allUsedKeys: TAllUsedKeys = {};

export function useAllowedUsers(props: TUseAllowedUserProps = {}) {
  const { enabled, ...queryProps } = props;
  const queryClient = useQueryClient();
  // const invalidateKeys = useInvalidateReactQueryKeys();
  const routePath = usePathname();

  /* Use partrial query url as a part of the query key */
  const queryHash = React.useMemo(() => composeQueryHash(queryProps), [queryProps]);
  const queryKey = React.useMemo<QueryKey>(() => ['AllowedUsers', queryHash], [queryHash]);
  allUsedKeys[stringifyQueryKey(queryKey)] = queryKey;

  const query: UseInfiniteQueryResult<TAllowedUserResultsQueryData, Error> = useInfiniteQuery<
    TGetAllowedUserResults,
    Error,
    InfiniteData<TGetAllowedUserResults>,
    QueryKey,
    number // Cursor type (from `skip` api parameter)
  >({
    queryKey,
    staleTime, // Data validity period
    enabled,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.reduce((acc, page) => acc + page.items.length, 0);
      return loadedCount < lastPage.totalCount ? loadedCount : undefined;
    },
    queryFn: async (params) => {
      const { pageParam = 0 } = params;
      try {
        // OPTION 1: Using server function
        const results = await getAllowedUsersResults({
          ...queryProps,
          skip: pageParam,
          take: itemsLimit,
        });
        return results;
      } catch (error) {
        const message = ['Cannot load available users data', getErrorText(error)]
          .filter(Boolean)
          .join(': ');
        // eslint-disable-next-line no-console
        console.error('[useAllowedUsers:queryFn]', message, {
          error,
          pageParam,
          // url,
        });
        // eslint-disable-next-line no-debugger
        debugger;
        toast.error(message);
        throw error;
      }
    },
  });

  // Derived data...

  const allAllowedUsers = React.useMemo(() => {
    return getUnqueItemsList<TAllowedUser, TAllowedUserId>(query.data?.pages);
    // return query.data?.pages.flatMap((page) => page.items) || [];
  }, [query.data?.pages]);

  // UNUSED: Incapsulated helpers...
  /* Add new AvailableUser record to the pages data
   * @param {TAllowedUser} newAllowedUser - Record to add
   * @param {boolean} toStart - Add the new item to the beginning of the existing items. TODO: Determine default behavior by `orderBy`?
   */
  const addNewAllowedUser = React.useCallback(
    (newAllowedUser: TAllowedUser, toStart?: boolean) =>
      addNewItemToQueryCache<TAllowedUser, TAllowedUserId>(
        queryClient,
        queryKey,
        newAllowedUser,
        toStart,
      ),
    [queryClient, queryKey],
  );
  /** Delete the specified AvailableUser (by id) from the pages data.
   * @param {TAllowedUserId} availableUserIdToDelete - Assuming AvailableUser has a unique id of string or number type
   */
  const deleteAllowedUser = React.useCallback(
    (availableUserIdToDelete: TAllowedUserId) =>
      deleteItemFromQueryCache<TAllowedUser, TAllowedUserId>(
        queryClient,
        queryKey,
        availableUserIdToDelete,
      ),
    [queryClient, queryKey],
  );
  const deleteAllowedUsers = React.useCallback(
    (availableUserIdsToDelete: TAllowedUserId[]) =>
      deleteItemsFromQueryCache<TAllowedUser, TAllowedUserId>(
        queryClient,
        queryKey,
        availableUserIdsToDelete,
      ),
    [queryClient, queryKey],
  );
  /** Update the specified AvailableUser (by id) from the pages data.
   * @param {TAllowedUserId} availableUserIdToDelete - Assuming AvailableUser has a unique id of string or number type
   */
  const updateAllowedUser = React.useCallback(
    (updatedAllowedUser: TAllowedUser) =>
      updateItemInQueryCache<TAllowedUser, TAllowedUserId>(
        queryClient,
        queryKey,
        updatedAllowedUser,
      ),
    [queryClient, queryKey],
  );
  /** Invalidate all used keys, except optional specified ones
   * @param {QueryKey[]} [excludeKeys] -- The list of keys to exclude from the invalidation
   */
  const invalidateAllKeysExcept = React.useCallback(
    (excludeKeys?: QueryKey[]) =>
      invalidateAllUsedKeysExcept(queryClient, excludeKeys, allUsedKeys),
    [queryClient],
  );

  /* // List of query properties:
   * status
   * error
   * data
   * isLoading
   * isError
   * isPending
   * isLoadingError
   * isRefetchError
   * isSuccess
   * isPlaceholderData
   * fetchNextPage
   * fetchPreviousPage
   * hasNextPage
   * hasPreviousPage
   * isFetchNextPageError
   * isFetchingNextPage
   * isFetchPreviousPageError
   * isFetchingPreviousPage
   * dataUpdatedAt
   * errorUpdatedAt
   * failureCount
   * failureReason
   * errorUpdateCount
   * isFetched
   * isFetchedAfterMount
   * isFetching
   * isInitialLoading
   * isPaused
   * isRefetching
   * isStale
   * isEnabled
   * refetch
   * fetchStatus
   * promise
   */

  return {
    ...query,
    // Derived data...
    routePath,
    queryProps,
    queryKey,
    allUsedKeys,
    allAllowedUsers,
    hasAllowedUser: !!allAllowedUsers?.length, // !!query.data?.pages[0]?.totalCount,
    // Helpers...
    invalidateAllKeysExcept,
    addNewAllowedUser,
    deleteAllowedUsers,
    deleteAllowedUser,
    updateAllowedUser,
  };
}
