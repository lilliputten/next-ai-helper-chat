'use client';

import React from 'react';
import { toast } from 'sonner';

import { getErrorText } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Check, Close, FlaskConical, Spinner } from '@/components/shared/Icons';
import { ShowLogRecords, TLogRecord } from '@/components/test/ShowLogRecords';
import { ConfirmModal } from '@/components/ui-atoms';
import { isDev } from '@/config';

import { getServerInfo } from './getServerInfo';
import { sendSetCommandsRequest } from './sendSetCommandsRequest';
import { sendWebhookStartRequest } from './sendWebhookStartRequest';

const __useDebugData = isDev && false;

export function StartBotPage() {
  const [_error, setError] = React.useState<string | null>(null);
  const [logs, setLogs] = React.useState<TLogRecord[]>([]);

  const [isModalVisible, setModalVisible] = React.useState(false);

  const addLog = React.useCallback((record: TLogRecord) => {
    setLogs((prev) => [...prev, record]);
  }, []);

  const [isInitWebhookRunning, startInitWebhook] = React.useTransition();
  const [isSetCommandsRunning, startSetCommands] = React.useTransition();
  const [isShowServerInfoRunning, startShowServerInfo] = React.useTransition();

  const isPending = isInitWebhookRunning || isSetCommandsRunning;

  const showServerInfo = React.useCallback(() => {
    startShowServerInfo(async () => {
      // return await new Promise((r) => setTimeout(r, 3000));
      setError(null);
      addLog({ type: 'info', content: `Setting bot commands...` });
      try {
        const res = await getServerInfo();
        addLog({ type: 'data', title: 'Response data:', content: res });
        toast.success('Successfully received server info!');
      } catch (error) {
        const errMsg = getErrorText(error);
        // eslint-disable-next-line no-console
        console.error('[StartBotPage:showServerInfo]', errMsg, { error });
        debugger; // eslint-disable-line no-debugger
        setError(errMsg);
        toast.error(errMsg);
        addLog({ type: 'error', content: `Error occurred: ${errMsg}` });
      } finally {
        addLog({ type: 'info', content: 'Request complete' });
      }
    });
  }, [addLog]);

  const initWebhook = React.useCallback(() => {
    startInitWebhook(async () => {
      setError(null);
      addLog({ type: 'info', content: `Initializing bot webhook...` });
      try {
        const res = await sendWebhookStartRequest();
        addLog({ type: 'data', title: 'Response data:', content: res });
        toast.success('Successfully initialized webhook');
      } catch (error) {
        const errMsg = getErrorText(error);
        // eslint-disable-next-line no-console
        console.error('[StartBotPage:initWebhook]', errMsg, { error });
        debugger; // eslint-disable-line no-debugger
        setError(errMsg);
        toast.error(errMsg);
        addLog({ type: 'error', content: `Error occurred: ${errMsg}` });
      } finally {
        addLog({ type: 'info', content: 'Request complete' });
      }
    });
  }, [addLog]);

  const setCommands = React.useCallback(() => {
    startSetCommands(async () => {
      // return await new Promise((r) => setTimeout(r, 3000));
      setError(null);
      addLog({ type: 'info', content: `Setting bot commands...` });
      try {
        const res = await sendSetCommandsRequest();
        addLog({ type: 'data', title: 'Response data:', content: res });
        toast.success('Successfully set bot commands!');
      } catch (error) {
        const errMsg = getErrorText(error);
        // eslint-disable-next-line no-console
        console.error('[StartBotPage:setCommands]', errMsg, { error });
        debugger; // eslint-disable-line no-debugger
        setError(errMsg);
        toast.error(errMsg);
        addLog({ type: 'error', content: `Error occurred: ${errMsg}` });
      } finally {
        addLog({ type: 'info', content: 'Request complete' });
      }
    });
  }, [addLog]);

  const clearLogs = React.useCallback(() => {
    setLogs([]);
  }, []);

  const hasLogs = !!logs.length;

  const ShowServerInfoIcon = isShowServerInfoRunning ? Spinner : Check;
  const InitWebhookIcon = isInitWebhookRunning ? Spinner : Check;
  const SetCommandsIcon = isSetCommandsRunning ? Spinner : Check;

  return (
    <div
      // onSubmit={onSubmit}
      className={cn(
        isDev && '__StartBotPage', // DEBUG
        'mx-auto flex max-w-xl flex-col gap-6 rounded-md bg-black/10 p-6 shadow-md',
        // 'space-y-6',
      )}
    >
      <h1 className="text-2xl">Initialize Telegram Webhook</h1>
      {__useDebugData && (
        <div>
          <span className="rounded-full bg-red-500 px-3 py-1.5 text-xs text-white">
            <span className="font-bold">DEBUG MODE</span>{' '}
            <span className="opacity-70">The fake local data will be returned</span>
          </span>
        </div>
      )}
      {/*
      <StartBotPageActions logs={logs} clearLogs={clearLogs} isPending={isPending}
        initWebhook={initWebhook}
        setCommands={setCommands}
      />
      */}
      <div
        className={cn(
          isDev && '__StartBotPageActions', // DEBUG
          'flex flex-wrap items-center gap-2',
        )}
      >
        {/* showServerInfo */}
        <button
          type="submit"
          disabled={isInitWebhookRunning}
          onClick={showServerInfo}
          className={cn(
            'bg-primary-500 hover:bg-primary-400 focus:ring-primary-500 cursor-pointer rounded px-4 py-2 font-semibold text-white focus:ring-2 focus:outline-none',
            'flex flex-1 items-center justify-center gap-2 transition',
            isShowServerInfoRunning && 'pointer-events-none opacity-50',
          )}
        >
          <ShowServerInfoIcon
            className={cn('size-4 opacity-50', isShowServerInfoRunning && 'animate-spin')}
          />
          <span className="truncate">Show server info</span>
        </button>
        {/* initWebhook */}
        <button
          type="submit"
          disabled={isInitWebhookRunning}
          onClick={initWebhook}
          className={cn(
            'bg-primary-500 hover:bg-primary-400 focus:ring-primary-500 cursor-pointer rounded px-4 py-2 font-semibold text-white focus:ring-2 focus:outline-none',
            'flex flex-1 items-center justify-center gap-2 transition',
            isInitWebhookRunning && 'pointer-events-none opacity-50',
          )}
        >
          <InitWebhookIcon
            className={cn('size-4 opacity-50', isInitWebhookRunning && 'animate-spin')}
          />
          <span className="truncate">Initialize webhook</span>
        </button>
        {/* setCommands */}
        <button
          type="submit"
          disabled={isInitWebhookRunning}
          onClick={setCommands}
          className={cn(
            'bg-primary-500 hover:bg-primary-400 focus:ring-primary-500 cursor-pointer rounded px-4 py-2 font-semibold text-white focus:ring-2 focus:outline-none',
            'flex flex-1 items-center justify-center gap-2 transition',
            isSetCommandsRunning && 'pointer-events-none opacity-50',
          )}
        >
          <SetCommandsIcon
            className={cn('size-4 opacity-50', isSetCommandsRunning && 'animate-spin')}
          />
          <span className="truncate">Set commands</span>
        </button>
        {/* clearLogs */}
        <button
          type="button"
          disabled={isPending}
          className={cn(
            'focus:ring-primary-500 cursor-pointer rounded bg-gray-600 px-4 py-2 font-semibold text-white hover:bg-gray-700 focus:ring-2 focus:outline-none',
            'flex flex-1 items-center justify-center gap-2 transition',
            (!hasLogs || isPending) && 'pointer-events-none opacity-50',
          )}
          onClick={clearLogs}
        >
          <Close className="size-4 opacity-50" />
          <span className="truncate">Clear log</span>
        </button>
      </div>
      <ShowLogRecords logs={logs} />
      {/* <DialogDemo /> */}
      <ConfirmModal
        dialogTitle="Confirm delete answer"
        confirmButtonVariant="destructive"
        confirmButtonText="Delete"
        confirmButtonBusyText="Deleting"
        cancelButtonText="Cancel"
        handleClose={() => setModalVisible(false)}
        handleConfirm={() => {
          debugger;
          setModalVisible(false);
        }}
        isPending={isPending}
        isVisible={isModalVisible}
      >
        Do you confirm deleting the answer?
      </ConfirmModal>
      <Button onClick={() => setModalVisible(true)} className="flex gap-2" variant="primary">
        <FlaskConical className="size-4" />
        Show Modal
      </Button>
    </div>
  );
}
