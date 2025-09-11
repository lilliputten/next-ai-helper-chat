import { GigaChat } from 'gigachat';

import { GIGACHAT_CREDENTIALS } from '@/config/env';
import { getHttpsAgent } from '@/lib/ai/getHttpsAgent';

let cachedClient: GigaChat | undefined;

// Create client instance
export async function getGigaChatClient() {
  if (cachedClient) {
    return cachedClient;
  }
  let client: GigaChat | undefined;
  try {
    // GigaChat
    client = new GigaChat({
      credentials: GIGACHAT_CREDENTIALS,
      httpsAgent: getHttpsAgent(),
    });
    if (!client) {
      throw new Error(`Cannot create a GigaChat client.`);
    }
    cachedClient = client;
    return client;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getGigaChatClient] ❌ Error:', error);
    debugger; // eslint-disable-line no-debugger
    throw error;
  }
}
