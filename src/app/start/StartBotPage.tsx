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
        'mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-hidden py-4',
      )}
    >
      <div className="flex flex-col gap-4 px-4 py-4">
        <h1 className="text-2xl">Initialize Telegram Webhook</h1>
        {__useDebugData && (
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-red-500 px-3 py-1.5 text-xs text-white">
              <span className="font-bold">DEBUG MODE</span>{' '}
              <span className="opacity-70">The fake local data will be returned</span>
            </span>
          </div>
        )}
      </div>
      {/*
      <StartBotPageActions logs={logs} clearLogs={clearLogs} isPending={isPending}
        initWebhook={initWebhook}
        setCommands={setCommands}
      />
      */}
      <div
        className={cn(
          isDev && '__StartBotPageActions', // DEBUG
          'flex flex-wrap items-center gap-2 px-4 py-2',
        )}
      >
        {/* showServerInfo */}
        <Button
          disabled={isInitWebhookRunning}
          onClick={showServerInfo}
          variant="theme"
          className={cn('flex gap-2', isShowServerInfoRunning && 'pointer-events-none opacity-50')}
        >
          <ShowServerInfoIcon
            className={cn('size-4 opacity-50', isShowServerInfoRunning && 'animate-spin')}
          />
          <span className="truncate">Show server info</span>
        </Button>
        {/* initWebhook */}
        <Button
          disabled={isInitWebhookRunning}
          onClick={initWebhook}
          variant="theme"
          className="flex gap-2"
        >
          <InitWebhookIcon
            className={cn('size-4 opacity-50', isInitWebhookRunning && 'animate-spin')}
          />
          <span className="truncate">Initialize webhook</span>
        </Button>
        {/* setCommands */}
        <Button
          disabled={isSetCommandsRunning}
          onClick={setCommands}
          variant="theme"
          className="flex gap-2"
        >
          <SetCommandsIcon className={cn('size-4 opacity-50')} />
          <span className="truncate">Set commands</span>
        </Button>
        {/* clearLogs */}
        <Button
          disabled={!hasLogs || isPending}
          variant="ghost"
          className="flex gap-2"
          onClick={clearLogs}
        >
          <Close className="size-4 opacity-50" />
          <span className="truncate">Clear log</span>
        </Button>
      </div>
      <ShowLogRecords logs={logs} className="mx-4 my-6" />
      {/* <DialogDemo /> */}
      <ConfirmModal
        dialogTitle="Confirm delete answer"
        confirmButtonVariant="destructive"
        confirmButtonText="Delete"
        confirmButtonBusyText="Deleting"
        cancelButtonText="Cancel"
        handleClose={() => setModalVisible(false)}
        handleConfirm={() => {
          setModalVisible(false);
        }}
        isPending={isPending}
        isVisible={isModalVisible}
      >
        Do you confirm deleting the answer?
      </ConfirmModal>
      <div
        className={cn(
          isDev && '__StartBotPageActions', // DEBUG
          'flex flex-wrap items-center gap-2 px-4 py-2',
        )}
      >
        <Button
          onClick={() => setModalVisible(true)}
          className="flex flex-1 gap-2"
          variant="primary"
        >
          <FlaskConical className="size-4 opacity-50" />
          <span className="truncate">Show Modal</span>
        </Button>
      </div>
    </div>
  );
}
