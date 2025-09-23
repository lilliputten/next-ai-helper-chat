'use server';

import {
  BOT_TOKEN,
  BOT_USERNAME,
  isDev,
  isLocal,
  isVercel,
  isVercelPreview,
  isVercelProduction,
  PUBLIC_URL,
} from '@/config/envServer';
import { versionInfo } from '@/config';

export async function getServerInfo() {
  try {
    return {
      versionInfo,
      PUBLIC_URL,
      BOT_USERNAME,
      BOT_TOKEN,
      isLocal,
      isDev,
      isVercel,
      isVercelPreview,
      isVercelProduction,
    };
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    // eslint-disable-next-line no-console
    console.error('[StartBotPage:getServerInfo]', errMsg, { error });
    debugger; // eslint-disable-line no-debugger
    throw error;
  }
}
