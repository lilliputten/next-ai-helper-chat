'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { truncateString } from '@/lib/helpers';
import { TAiClientType } from '@/lib/types/TAiClientType';
import { cn } from '@/lib/utils';
import { LogRecords, TLogRecord } from '@/components/test/LogRecords';
import { isDev } from '@/config';
import { loadDemoImage, sendAiImageQuery } from '@/features/ai/actions/sendAiImageQuery';
import { TPlainMessage } from '@/features/ai/types/messages';

import { ImageQueryFormActions } from './ImageQueryFormActions';
import { defaultValues, formSchema, TFormData, TFormType } from './ImageQueryFormDefinitions';
import { ImageQueryFormFields } from './ImageQueryFormFields';

const __useDebugData = isDev && true;
const __useInitialData = isDev && false;

// Only GigaChat model is supported for image queries
const model: TAiClientType = 'GigaChat';

export function ImageQueryForm() {
  const [_error, setError] = React.useState<string | null>(null);
  const [logs, setLogs] = React.useState<TLogRecord[]>([]);

  const addLog = React.useCallback((record: TLogRecord) => {
    setLogs((prev) => [...prev, record]);
  }, []);

  // Effect: Show debug image
  React.useEffect(() => {
    if (__useInitialData) {
      loadDemoImage()
        .then((imageData) => {
          if (imageData) {
            addLog({
              type: 'imageData',
              title: 'Sample image',
              content: imageData,
            });
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('[ImageQueryForm]', error);
          debugger; // eslint-disable-line no-debugger
        });
    }
  }, [addLog]);

  const form: TFormType = useForm<TFormData>({
    mode: 'onChange',
    criteriaMode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { handleSubmit } = form;

  const [isPending, startTransition] = React.useTransition();

  const sendQuery = React.useCallback(
    async (formData: TFormData) => {
      const {
        // model, // Model isn't used here
        systemQueryText,
        userQueryText,
      } = formData;
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
        const queryResult = await sendAiImageQuery(model, messages, __useDebugData);
        const { imageData, response } = queryResult;
        addLog({ type: 'success', title: 'Received response:', content: response });
        addLog({ type: 'imageData', title: 'Image received:', content: imageData });
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : String(error);
        // eslint-disable-next-line no-console
        console.error('[ImageQueryForm:sendQuery]', errMsg, { error });
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
        isDev && '__ImageQueryForm', // DEBUG
        'mx-auto flex max-w-xl flex-col gap-6 rounded-md bg-black/10 p-6 shadow-md',
        // 'space-y-6',
      )}
    >
      <h1 className="text-2xl">Image Query</h1>
      {__useDebugData && (
        <div>
          <span className="rounded-full bg-red-500 px-3 py-1.5 text-xs text-white">
            <span className="font-bold">DEBUG MODE</span>{' '}
            <span className="opacity-70">The fake local data will be returned</span>
          </span>
        </div>
      )}
      <ImageQueryFormFields form={form} />
      <ImageQueryFormActions form={form} logs={logs} clearLogs={clearLogs} isPending={isPending} />
      <LogRecords logs={logs} />
    </form>
  );
}
