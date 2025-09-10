'use client';

import React from 'react';
import { Check, Loader2, X } from 'lucide-react';

import { aiClientTypes, defaultAiClientType, TAiClientType } from '@/lib/types/TAiClientType';
import { cn } from '@/lib/utils';
import { isDev } from '@/config';

type TLogType = 'info' | 'error' | 'success' | 'data';

type TLogRecord = {
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

export function QueryForm() {
  const [model, setModel] = React.useState<TAiClientType>(defaultAiClientType);
  // const [requestName, setRequestName] = React.useState('');
  const [systemQueryText, setSystemQueryText] = React.useState('');
  const [userQueryText, setUserQueryText] = React.useState('');
  const [resultText, setResultText] = React.useState<string | null>(null);
  const [resultData, setResultData] = React.useState<unknown | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [logs, setLogs] = React.useState<TLogRecord[]>([
    // { type: 'data', title: 'Data received', content: 'Test' },
  ]);
  const [loading, setLoading] = React.useState(false);

  const addLog = (record: TLogRecord) => {
    setLogs((prev) => [...prev, record]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResultText(null);
    setError(null);
    // setLogs([]);
    setLoading(true);
    addLog({ type: 'info', content: `Submitting request to model ${model}...` });

    try {
      /* // DEBUG
       * throw new Error('Test error text');
       */
      // Simulating query call - replace with actual API call
      await new Promise((r) => setTimeout(r, 1000));
      const resultText = `Request for model ${model}: Query "${systemQueryText}" / "${userQueryText}" processed successfully.`;
      const resultData = { sample: 'ok' };
      setResultText(resultText);
      setResultData(resultData);
      addLog({ type: 'success', content: `Received response: ${resultText}` });
      addLog({ type: 'data', title: 'Data received:', content: resultData });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      // eslint-disable-next-line no-console
      console.error('[QueryForm]', errMsg, {
        error,
      });
      debugger; // eslint-disable-line no-debugger
      setError(errMsg);
      addLog({ type: 'error', content: `Error occurred: ${errMsg}` });
    } finally {
      setLoading(false);
      addLog({ type: 'info', content: 'Request complete' });
    }
  };

  const SubmitIcon = loading ? Loader2 : Check;

  return (
    <div className="mx-auto max-w-xl rounded-md bg-black/10 p-6 shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="model" className="block font-medium opacity-50">
            AI Model
          </label>
          <select
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value as TAiClientType)}
            className="w-full appearance-none rounded border border-gray-500 px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {aiClientTypes.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>

        {/*
        <div className="flex flex-col gap-1">
          <label htmlFor="requestName" className="block font-medium opacity-50">
            Request Name (optional)
          </label>
          <input
            id="requestName"
            type="text"
            value={requestName}
            onChange={(e) => setRequestName(e.target.value)}
            // required
            className="w-full rounded border border-gray-500 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        */}

        <div className="flex flex-col gap-1">
          <label htmlFor="systemQueryText" className="block font-medium opacity-50">
            System Query Text
          </label>
          <textarea
            id="systemQueryText"
            value={systemQueryText}
            onChange={(e) => setSystemQueryText(e.target.value)}
            rows={5}
            // required
            className="w-full rounded border border-gray-500 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="userQueryText" className="block font-medium opacity-50">
            User Query Text
          </label>
          <textarea
            id="userQueryText"
            value={userQueryText}
            onChange={(e) => setUserQueryText(e.target.value)}
            rows={5}
            // required
            className="w-full rounded border border-gray-500 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div
          className={cn(
            isDev && '__Actions', // DEBUG
            'flex flex-wrap items-center gap-2',
          )}
        >
          <button
            type="submit"
            disabled={loading}
            className={cn(
              'flex-1 cursor-pointer rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none',
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
              'cursor-pointer rounded bg-gray-600 px-4 py-2 font-semibold text-white hover:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none',
              'flex items-center justify-center gap-2 transition',
              loading && 'pointer-events-none opacity-50',
            )}
            onClick={() => setLogs([])}
          >
            <X className="size-4 opacity-50" />
            <span>Clear log</span>
          </button>
        </div>
      </form>

      <div className="mt-8 flex min-h-[120px] flex-col gap-4 rounded-md border border-gray-500/20 p-4">
        <h2 className="text-lg font-semibold">ResultText / Error / Logs</h2>

        {/*
        {error && <div className="font-medium text-red-600">Error: {error}</div>}

        {resultText && <div className="whitespace-pre-wrap text-green-700">{resultText}</div>}

        {resultData ? (
          <pre className="text-sm whitespace-pre-wrap text-gray-500">
            {JSON.stringify(resultData, null, 2)}
          </pre>
        ) : null}
        */}

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
                  isDev && '__LogRecord', // DEBUG
                  'flex flex-col gap-2',
                  logStyles[type],
                )}
                key={i}
              >
                {title && <h3 className="font-bold">{title}</h3>}
                {result}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
