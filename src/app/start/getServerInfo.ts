'use server';

import {
  BOT_USERNAME,
  isDev,
  isLocal,
  isVercel,
  isVercelPreview,
  isVercelProduction,
} from '@/config/envServer';
import { versionInfo } from '@/config';

export async function getServerInfo() {
  try {
    return {
      versionInfo,
      BOT_USERNAME,
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
