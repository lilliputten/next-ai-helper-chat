'use client';

import React from 'react';
import { Check, Loader2, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { isDev } from '@/config';

interface TQueryFormActionsProps {
  // handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearLogs: () => void;
  loading: boolean;
}

export function QueryFormActions(props: TQueryFormActionsProps) {
  const { clearLogs, loading } = props;

  const SubmitIcon = loading ? Loader2 : Check;

  return (
    <div
      className={cn(
        isDev && '__QueryFormActions', // DEBUG
        'flex flex-wrap items-center gap-2',
      )}
    >
      <button
        type="submit"
        disabled={loading}
        className={cn(
          'bg-primary-400 hover:bg-primary-300 focus:ring-primary-500 flex-1 cursor-pointer rounded px-4 py-2 font-semibold text-white focus:ring-2 focus:outline-none',
          'flex items-center justify-center gap-2 transition',
          loading && 'pointer-events-none opacity-50',
        )}
      >
        <SubmitIcon className={cn('size-4 opacity-50', loading && 'animate-spin')} />
        <span>{loading ? 'Processing...' : 'Submit'}</span>
      </button>
      <button
        type="button"
        disabled={loading}
        className={cn(
          'focus:ring-primary-500 cursor-pointer rounded bg-gray-600 px-4 py-2 font-semibold text-white hover:bg-gray-700 focus:ring-2 focus:outline-none',
          'flex items-center justify-center gap-2 transition',
          loading && 'pointer-events-none opacity-50',
        )}
        onClick={clearLogs}
      >
        <X className="size-4 opacity-50" />
        <span>Clear log</span>
      </button>
    </div>
  );
}
