import { ChatDeepSeek } from '@langchain/deepseek';
import { GigaChat, GigaChatCallOptions } from 'langchain-gigachat';

import {
  // DEEPSEEK_API_KEY,
  // HUGGINGFACEHUB_API_KEY,
  GIGACHAT_CREDENTIALS,
  GIGACHAT_MODEL,
} from '@/env';

import { getHttpsAgent } from './getHttpsAgent';

export type TAIClient = GigaChat<GigaChatCallOptions> | ChatDeepSeek;

let client: TAIClient | undefined;

// Create client instance
export async function getAIClient() {
  if (client) {
    return client;
  }
  try {
    /* // Deep Seek (requires balance refill)
     * client = new ChatDeepSeek({
     *   apiKey: DEEPSEEK_API_KEY,
     *   model: 'deepseek-chat', // Use the correct DeepSeek model name
     * });
     */
    // GigaChat
    client = new GigaChat({
      credentials: GIGACHAT_CREDENTIALS,
      model: GIGACHAT_MODEL,
      useApiForTokens: true, // enable token counting via API
      httpsAgent: getHttpsAgent(),
    });
    return client;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getAIClient:getAiClient] ❌ Error:', error);
    debugger; // eslint-disable-line no-debugger
    throw error;
  }
}
