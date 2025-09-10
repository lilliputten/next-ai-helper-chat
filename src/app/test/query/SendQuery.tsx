'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { isDev } from '@/config';

import { LogRecords, TLogRecord } from './LogRecords';
import { QueryFormActions } from './QueryFormActions';
import { defaultValues, formSchema, TFormData, TFormType } from './QueryFormDefinitions';
import { QueryFormFields } from './QueryFormFields';

export function SendQuery() {
  const [_resultText, setResultText] = React.useState<string | null>(null);
  const [_resultData, setResultData] = React.useState<unknown | null>(null);
  const [_error, setError] = React.useState<string | null>(null);
  const [logs, setLogs] = React.useState<TLogRecord[]>([
    // {
    //   type: 'data',
    //   title: 'Sample data record',
    //   content: 'Extra long data content text for testing purposes',
    // },
  ]);

  const form: TFormType = useForm<TFormData>({
    mode: 'onChange',
    criteriaMode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    // formState,
  } = form;

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
      addLog({ type: 'info', content: `Submitting request to model ${model}...` });
      console.log('[SendQuery:sendQuery] start', {
        model,
        systemQueryText,
        userQueryText,
      });
      try {
        // Simulating query call - replace with actual API call
        await new Promise((r) => setTimeout(r, 5000));
        const resultText = `Request for model ${model}: Query "${systemQueryText}" / "${userQueryText}" processed successfully.`;
        const resultData = { sample: 'ok' };
        console.log('[SendQuery:sendQuery] done', {
          resultText,
          resultData,
          model,
          systemQueryText,
          userQueryText,
        });
        setResultText(resultText);
        setResultData(resultData);
        addLog({ type: 'success', title: 'Received response:', content: `${resultText}` });
        addLog({ type: 'data', title: 'Data received:', content: resultData });
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
    <div className="mx-auto max-w-xl rounded-md bg-black/10 p-6 shadow-md">
      <form
        onSubmit={onSubmit}
        className={cn(
          isDev && '__QueryForm', // DEBUG
          'space-y-6',
        )}
      >
        <QueryFormFields form={form} />
        <QueryFormActions clearLogs={clearLogs} loading={isPending} />
        <LogRecords logs={logs} />
      </form>
    </div>
  );
}
