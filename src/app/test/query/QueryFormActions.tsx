'use client';

import React from 'react';
import { Check, Loader2, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { isDev } from '@/config';

import { TLogRecord } from './LogRecords';
import { TFormType } from './QueryFormDefinitions';

interface TQueryFormActionsProps {
  form: TFormType;
  clearLogs: () => void;
  isPending: boolean;
  logs: TLogRecord[];
}

export function QueryFormActions(props: TQueryFormActionsProps) {
  const { form, logs, clearLogs, isPending } = props;

  const { formState } = form;
  const { isDirty, isValid } = formState;
  const isSubmitEnabled = !isPending && isDirty && isValid;

  const hasLogs = !!logs.length;

  const SubmitIcon = isPending ? Loader2 : Check;

  return (
    <div
      className={cn(
        isDev && '__QueryFormActions', // DEBUG
        'flex flex-wrap items-center gap-2',
      )}
    >
      <button
        type="submit"
        disabled={isPending}
        className={cn(
          'bg-primary-400 hover:bg-primary-300 focus:ring-primary-500 flex-1 cursor-pointer rounded px-4 py-2 font-semibold text-white focus:ring-2 focus:outline-none',
          'flex items-center justify-center gap-2 transition',
          !isSubmitEnabled && 'pointer-events-none opacity-50',
        )}
      >
        <SubmitIcon className={cn('size-4 opacity-50', isPending && 'animate-spin')} />
        <span>{isPending ? 'Processing...' : 'Submit'}</span>
      </button>
      <button
        type="button"
        disabled={isPending}
        className={cn(
          'focus:ring-primary-500 cursor-pointer rounded bg-gray-600 px-4 py-2 font-semibold text-white hover:bg-gray-700 focus:ring-2 focus:outline-none',
          'flex items-center justify-center gap-2 transition',
          (!hasLogs || isPending) && 'pointer-events-none opacity-50',
        )}
        onClick={clearLogs}
      >
        <X className="size-4 opacity-50" />
        <span>Clear log</span>
      </button>
    </div>
  );
}
