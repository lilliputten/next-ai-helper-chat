'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Check, Close, Eye, Spinner } from '@/components/shared/Icons';
import { TLogRecord } from '@/components/test/ShowLogRecords';
import { isDev } from '@/config';

import { TFormType } from './TextQueryFormDefinitions';

interface TTextQueryFormActionsProps {
  form: TFormType;
  clearLogs: () => void;
  isPending: boolean;
  logs: TLogRecord[];
  showForm: boolean;
  toggleForm: (v: boolean) => void;
}

export function TextQueryFormActions(props: TTextQueryFormActionsProps) {
  const { form, logs, clearLogs, isPending, showForm, toggleForm } = props;

  const { formState, watch } = form;
  const { isValid, isReady } = formState;

  const values = watch();

  const isEmpty = React.useMemo(() => {
    // Check if all values are empty or equivalent to their default empty state
    return Object.entries(values)
      .filter(([id]) => id !== 'model')
      .every(
        ([_id, value]) =>
          value === '' ||
          value === null ||
          value === undefined ||
          (Array.isArray(value) && value.length === 0),
      );
  }, [values]);

  const isSubmitEnabled = !isPending && !isEmpty && isValid && isReady;

  const hasLogs = !!logs.length;

  const SubmitIcon = isPending ? Spinner : Check;

  return (
    <div
      className={cn(
        isDev && '__TextQueryFormActions', // DEBUG
        'flex flex-wrap items-center gap-2',
      )}
    >
      <Button type="submit" disabled={!isSubmitEnabled} variant="theme" className="flex gap-2">
        <SubmitIcon className={cn('size-4 opacity-50', isPending && 'animate-spin')} />
        <span>{isPending ? 'Processing...' : 'Submit'}</span>
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
        disabled={!hasLogs || isPending}
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
