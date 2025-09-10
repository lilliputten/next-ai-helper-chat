'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { MessageContent } from '@langchain/core/messages';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { isDev } from '@/config';
import { sendAiClientQuery } from '@/features/ai/actions/sendAiClientQuery';
import { TPlainMessage } from '@/features/ai/types/messages';

import { LogRecords, TLogRecord } from './LogRecords';
import { QueryFormActions } from './QueryFormActions';
import { defaultValues, formSchema, TFormData, TFormType } from './QueryFormDefinitions';
import { QueryFormFields } from './QueryFormFields';

const __useDebugData = isDev && true;

export function SendQuery() {
  const [_resultText, setResultText] = React.useState<MessageContent | null>(null);
  const [_resultData, setResultData] = React.useState<unknown | null>(null);
  const [_error, setError] = React.useState<string | null>(null);
  const [logs, setLogs] = React.useState<TLogRecord[]>([
    /* // DEMO: Sampe data
     * {
     *   type: 'data',
     *   title: 'Sample data record',
     *   content: 'Extra long data content text for testing purposes',
     * },
     */
  ]);

  const form: TFormType = useForm<TFormData>({
    mode: 'onChange',
    criteriaMode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { handleSubmit } = form;

  const [isPending, startTransition] = React.useTransition();

  const addLog = React.useCallback((record: TLogRecord) => {
    setLogs((prev) => [...prev, record]);
  }, []);

  const sendQuery = React.useCallback(
    async (formData: TFormData) => {
      const { model, systemQueryText, userQueryText } = formData;
      setResultText(null);
      setError(null);
      // setLoading(true);
      const queryInfo = [systemQueryText, userQueryText]
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => `"${s}"`)
        .join(' / ');
      addLog({ type: 'info', content: `Submitting query ${queryInfo} to model ${model}...` });
      try {
        const messages: TPlainMessage[] = [
          { type: 'system', text: systemQueryText },
          { type: 'user', text: userQueryText },
        ];
        console.log('[SendQuery:sendQuery] start', {
          messages,
          model,
          systemQueryText,
          userQueryText,
        });
        const queryResult = await sendAiClientQuery(model, messages, __useDebugData);
        const { content } = queryResult;
        // Simulating query call - replace with actual API call
        // await new Promise((r) => setTimeout(r, 1000));
        const resultText: MessageContent = content; // `Request ${queryInfo} for model ${model} processed successfully -> ${content}`;
        const resultData = queryResult; // { sample: 'ok' };
        console.log('[SendQuery:sendQuery] done', {
          content,
          queryResult,
          resultText,
          resultData,
          model,
          systemQueryText,
          userQueryText,
        });
        setResultText(resultText);
        setResultData(resultData);
        addLog({ type: 'data', title: 'Data received:', content: resultData });
        addLog({ type: 'success', title: 'Received response:', content: `${resultText}` });
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : String(error);
        // eslint-disable-next-line no-console
        console.error('[SendQuery:sendQuery]', errMsg, { error });
        debugger; // eslint-disable-line no-debugger
        setError(errMsg);
        addLog({ type: 'error', content: `Error occurred: ${errMsg}` });
      } finally {
        // setLoading(false);
        addLog({ type: 'info', content: 'Request complete' });
      }
    },
    [addLog],
  );

  const onSubmit = handleSubmit((formData) => {
    startTransition(async () => {
      await sendQuery(formData);
    });
  });

  const clearLogs = React.useCallback(() => {
    setLogs([]);
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        isDev && '__QueryForm', // DEBUG
        'mx-auto flex max-w-xl flex-col gap-6 rounded-md bg-black/10 p-6 shadow-md',
        // 'space-y-6',
      )}
    >
      {__useDebugData && (
        <div>
          <span className="rounded-full bg-red-500 px-3 py-1.5 text-xs text-white">
            <span className="font-bold">DEBUG MODE</span>{' '}
            <span className="opacity-70">The fake local data will be returned</span>
          </span>
        </div>
      )}
      <QueryFormFields form={form} />
      <QueryFormActions form={form} logs={logs} clearLogs={clearLogs} isPending={isPending} />
      <LogRecords logs={logs} />
    </form>
  );
}
