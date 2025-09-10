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
  success: 'text-green-700',
  info: 'whitespace-pre-wrap text-gray-400',
  data: 'text-gray-600',
};

interface TLogRecordsProps {
  logs: TLogRecord[];
}

function JsonContent({ content }: { content: unknown }) {
  return <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(content, null, 2)}</pre>;
}

function UnknownContent({ content }: { content: unknown }) {
  const result =
    typeof content === 'string' || React.isValidElement(content) ? (
      <div className="text-sm whitespace-pre-wrap">{content}</div>
    ) : (
      <JsonContent content={content} />
    );
  return result;
}

export function LogRecords(props: TLogRecordsProps) {
  const { logs } = props;
  const reversedLogs = [...logs].reverse();
  return (
    <div
      className={cn(
        isDev && '__LogRecords', // DEBUG
        'flex min-h-[120px] flex-col gap-4 overflow-hidden rounded-md border border-gray-500/10 p-4',
      )}
    >
      <h2 className="flex">
        <span className="flex-1 text-lg font-semibold">ResultText / Error / Logs</span>{' '}
        <span className="opacity-30">(reversed)</span>
      </h2>
      <div className="flex flex-col gap-4 overflow-auto">
        {reversedLogs.map((log, i) => {
          const { type, title, content } = log;
          const result =
            type === 'data' ? (
              <JsonContent content={content} />
            ) : (
              <UnknownContent content={content} />
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
