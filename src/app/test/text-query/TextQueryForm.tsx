'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { MessageContent } from '@langchain/core/messages';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { LogRecords, TLogRecord } from '@/components/test/LogRecords';
import { isDev } from '@/config';
import { sendAiTextQuery } from '@/features/ai/actions/sendAiTextQuery';
import { TPlainMessage } from '@/features/ai/types/messages';

import { TextQueryFormActions } from './TextQueryFormActions';
import { defaultValues, formSchema, TFormData, TFormType } from './TextQueryFormDefinitions';
import { TextQueryFormFields } from './TextQueryFormFields';

const __useDebugData = isDev && true;

export function TextQueryForm() {
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
      setError(null);
      const queryInfo = [systemQueryText, userQueryText]
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => `"${s}"`)
        .join(' / ');
      addLog({ type: 'info', content: `Submitting query ${queryInfo} to model ${model}...` });
      try {
        const messages: TPlainMessage[] = [
          { role: 'system', content: systemQueryText },
          { role: 'user', content: userQueryText },
        ];
        const queryResult = await sendAiTextQuery(model, messages, __useDebugData);
        const { content } = queryResult;
        const resultText: MessageContent = content; // `Request ${queryInfo} for model ${model} processed successfully -> ${content}`;
        const resultData = queryResult; // { sample: 'ok' };
        addLog({ type: 'data', title: 'Data received:', content: resultData });
        addLog({ type: 'success', title: 'Received response:', content: `${resultText}` });
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : String(error);
        // eslint-disable-next-line no-console
        console.error('[TextQueryForm:sendQuery]', errMsg, { error });
        debugger; // eslint-disable-line no-debugger
        setError(errMsg);
        addLog({ type: 'error', content: `Error occurred: ${errMsg}` });
      } finally {
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
        isDev && '__TextQueryForm', // DEBUG
        'mx-auto flex max-w-xl flex-col gap-6 rounded-md bg-black/10 p-6 shadow-md',
        // 'space-y-6',
      )}
    >
      <h1 className="text-2xl">Text Query</h1>
      {__useDebugData && (
        <div>
          <span className="rounded-full bg-red-500 px-3 py-1.5 text-xs text-white">
            <span className="font-bold">DEBUG MODE</span>{' '}
            <span className="opacity-70">The fake local data will be returned</span>
          </span>
        </div>
      )}
      <TextQueryFormFields form={form} />
      <TextQueryFormActions form={form} logs={logs} clearLogs={clearLogs} isPending={isPending} />
      <LogRecords logs={logs} />
    </form>
  );
}
