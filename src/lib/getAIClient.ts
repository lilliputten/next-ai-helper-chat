import { ChatCloudflareWorkersAI } from '@langchain/cloudflare';
import { ChatDeepSeek } from '@langchain/deepseek';
import { GigaChat, GigaChatCallOptions } from 'langchain-gigachat';

import {
  CLOUDFLARE_ACCOUNT_ID,
  CLOUDFLARE_API_TOKEN,
  // DEEPSEEK_API_KEY,
  // HUGGINGFACEHUB_API_KEY,
  // GIGACHAT_CREDENTIALS,
  // GIGACHAT_MODEL,
} from '@/env';

// import { getHttpsAgent } from './getHttpsAgent';

export type TAIClient = GigaChat<GigaChatCallOptions> | ChatCloudflareWorkersAI | ChatDeepSeek;

let client: TAIClient | undefined;

// Create client instance
export async function getAIClient() {
  if (client) {
    return client;
  }
  try {
    // Cloudflare
    client = new ChatCloudflareWorkersAI({
      model: '@cf/meta/llama-3.1-8b-instruct', // Default value
      cloudflareAccountId: CLOUDFLARE_ACCOUNT_ID,
      cloudflareApiToken: CLOUDFLARE_API_TOKEN,
      // Pass a custom base URL to use Cloudflare AI Gateway
      // baseUrl: `https://gateway.ai.cloudflare.com/v1/{YOUR_ACCOUNT_ID}/{GATEWAY_NAME}/workers-ai/`,
    });
    /* // Deep Seek (requires balance refill)
     * client = new ChatDeepSeek({
     *   apiKey: DEEPSEEK_API_KEY,
     *   model: 'deepseek-chat', // Use the correct DeepSeek model name
     * });
     */
    /* // GigaChat
     * client = new GigaChat({
     *   credentials: GIGACHAT_CREDENTIALS,
     *   model: GIGACHAT_MODEL,
     *   useApiForTokens: true, // enable token counting via API
     *   httpsAgent: getHttpsAgent(),
     * });
     */
    return client;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getAIClient:getAiClient] ❌ Error:', error);
    debugger; // eslint-disable-line no-debugger
    throw error;
  }
}
