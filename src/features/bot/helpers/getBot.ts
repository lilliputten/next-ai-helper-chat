import { Bot } from 'grammy';

import { BOT_TOKEN } from '@/config/envServer';
import { getErrorText } from '@/lib/helpers';

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN environment variable is undefined.');
}

const cachedBots: Record<string, Bot> = {};

export function getBot(id: string = BOT_TOKEN) {
  if (cachedBots[id]) {
    return cachedBots[id];
  }
  try {
    const bot = new Bot(id);
    cachedBots[id] = bot;
    return bot;
  } catch (error) {
    const errMsg = ['Bot creation error', getErrorText(error)].filter(Boolean).join(': ');
    // eslint-disable-next-line no-console
    console.error('[src/features/bot/helpers/getBot.ts]', errMsg, {
      error,
      id,
    });
    // eslint-disable-next-line no-debugger
    debugger;
    throw error;
  }
}
