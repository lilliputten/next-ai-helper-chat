import { QueryKey, useQueryClient } from '@tanstack/react-query';

import { TAllowedUser } from '@/features/allowed-users/types';

import { TGetResultsInfiniteQueryData } from './api';

export type TAllUsedKeys = Record<string, QueryKey>;
export type TQueryClient = ReturnType<typeof useQueryClient>;

// Allowed users queries results data

export type TAllowedUserResultsQueryData = TGetResultsInfiniteQueryData<TAllowedUser>;
