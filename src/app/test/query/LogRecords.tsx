'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { isDev } from '@/config';

type TLogType = 'info' | 'error' | 'success' | 'data';

export type TLogRecord = {
  type: 'info' | 'error' | 'success' | 'data';
  title?: string;
  content: unknown;
};

const logStyles: Partial<Record<TLogType, string>> = {
  error: 'font-medium text-red-600',
  success: 'font-medium text-green-700',
  info: 'whitespace-pre-wrap text-gray-400',
  data: 'text-gray-600',
};

interface TLogRecordsProps {
  logs: TLogRecord[];
}

export function LogRecords(props: TLogRecordsProps) {
  const { logs } = props;
  return (
    <div
      className={cn(
        isDev && '__LogRecords', // DEBUG
        'mt-8 flex min-h-[120px] flex-col gap-4 overflow-hidden rounded-md border border-gray-500/20 p-4',
      )}
    >
      <h2 className="text-lg font-semibold">ResultText / Error / Logs</h2>

      <div className="flex flex-col gap-4 overflow-auto">
        {logs.map((log, i) => {
          const { type, title, content } = log;
          const result =
            type === 'data' ? (
              <pre className="text-xs">{JSON.stringify(content, null, 2)}</pre>
            ) : (
              <div className="text-sm">{String(content)}</div>
            );
          return (
            <div
              className={cn(
                isDev && '__LogRecords_Item', // DEBUG
                'flex flex-col gap-2',
                logStyles[type],
              )}
              key={i}
            >
              {title && <h3 className="font-semibold">{title}</h3>}
              {result}
            </div>
          );
        })}
      </div>
    </div>
  );
}
