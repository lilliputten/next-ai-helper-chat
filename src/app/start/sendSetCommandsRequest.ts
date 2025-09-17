'use server';

import { BOT_TOKEN } from '@/config/envServer';
import { fetchJson } from '@/lib/helpers/requests';

import { botCommands } from './botCommands';

type TSetWebHookResponse = {
  ok: boolean;
  result: boolean;
  description: string;
};

export async function sendSetCommandsRequest() {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/setMyCommands`;
  const bodyData = { commands: botCommands };
  try {
    const res = await fetchJson<TSetWebHookResponse>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });
    return res;
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    // eslint-disable-next-line no-console
    console.error('[StartBotPage:sendSetCommandsRequest]', errMsg, { error });
    debugger; // eslint-disable-line no-debugger
    throw error;
  }
}
