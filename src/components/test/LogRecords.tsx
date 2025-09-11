'use client';

import React from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { isDev } from '@/config';

type TLogType = 'info' | 'error' | 'success' | 'data' | 'imageData';

export type TLogRecord = {
  type: TLogType;
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

function ImageContent({ content }: { content: string }) {
  const base64Encoded = btoa(content);
  const src = 'data:image;base64,' + base64Encoded;
  return (
    <div className="relative h-[300px] rounded-lg bg-black/10">
      <Image src={src} alt="Image" fill className="overflow-hidden object-contain p-4" />
    </div>
  );
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

function LogContent({ log }: { log: TLogRecord }) {
  const { type, content } = log;
  if (type === 'imageData') {
    return <ImageContent content={String(content)} />;
  }
  if (type === 'data') {
    return <JsonContent content={content} />;
  }
  return <UnknownContent content={content} />;
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
        <span className="flex-1 text-lg font-semibold">Operation Log</span>{' '}
        <span className="opacity-30">(reversed)</span>
      </h2>
      <div className="flex flex-col gap-4 overflow-auto">
        {reversedLogs.map((log, i) => {
          const { type, title } = log;
          const result = <LogContent log={log} />;
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
