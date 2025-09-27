'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Check, Close, Eye, Spinner } from '@/components/shared/Icons';
import { TLogRecord } from '@/components/test/ShowLogRecords';
import { isDev } from '@/config';

import { TFormType } from './ImageQueryFormDefinitions';

interface TImageQueryFormActionsProps {
  form: TFormType;
  clearLogs: () => void;
  isSubmitting: boolean;
  logs: TLogRecord[];
  showForm: boolean;
  toggleForm: (v: boolean) => void;
  isLoadingTokens: boolean;
  loadTokens: () => void;
}

export function ImageQueryFormActions(props: TImageQueryFormActionsProps) {
  const { form, logs, clearLogs, isSubmitting, showForm, toggleForm, loadTokens, isLoadingTokens } =
    props;

  const { formState, watch } = form;
  const { isValid, isReady } = formState;

  const values = watch();

  const isEmpty = React.useMemo(() => {
    // Check if all values are empty or equivalent to their default empty state
    return Object.values(values).every(
      (value) =>
        value === '' ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0),
    );
  }, [values]);

  const isSubmitEnabled = !isSubmitting && !isEmpty && isValid && isReady;

  const hasLogs = !!logs.length;

  const SubmitIcon = isSubmitting ? Spinner : Check;
  const LoadingTokensIcon = isLoadingTokens ? Spinner : Check;

  return (
    <div
      className={cn(
        isDev && '__ImageQueryFormActions', // DEBUG
        'flex flex-wrap items-center gap-2 p-4',
      )}
    >
      <Button type="submit" disabled={!isSubmitEnabled} variant="theme" className="flex gap-2">
        <SubmitIcon className={cn('size-4 opacity-50', isSubmitting && 'animate-spin')} />
        <span>Submit</span>
      </Button>
      <Button
        type="button"
        disabled={isLoadingTokens}
        variant="theme"
        className="flex gap-2"
        onClick={loadTokens}
      >
        <LoadingTokensIcon className={cn('size-4 opacity-50', isLoadingTokens && 'animate-spin')} />
        <span>Show available tokens</span>
      </Button>
      <Button
        type="button"
        variant="theme"
        className="flex gap-2"
        onClick={() => toggleForm(!showForm)}
      >
        <Eye className="size-4 opacity-50" />
        <span>{showForm ? 'Hide form' : 'Show form'}</span>
      </Button>
      <Button
        type="button"
        disabled={!hasLogs || isSubmitting}
        variant="ghost"
        className="flex gap-2"
        onClick={clearLogs}
      >
        <Close className="size-4 opacity-50" />
        <span>Clear log</span>
      </Button>
    </div>
  );
}
