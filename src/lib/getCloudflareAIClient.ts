import { ChatCloudflareWorkersAI } from '@langchain/community/chat_models/cloudflare_workersai';

import { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN } from '@/env';

export type TCloudflareAIClient = ChatCloudflareWorkersAI;

let client: TCloudflareAIClient | undefined;

// Create client instance
export async function getCloudflareAIClient() {
  if (client) {
    return client;
  }
  try {
    client = new ChatCloudflareWorkersAI({
      model: '@cf/meta/llama-2-7b-chat-int8', // Popular Cloudflare AI model
      cloudflareAccountId: CLOUDFLARE_ACCOUNT_ID,
      cloudflareApiToken: CLOUDFLARE_API_TOKEN,
    });
    return client;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[getCloudflareAIClient] ❌ Error:', error);
    debugger; // eslint-disable-line no-debugger
    throw error;
  }
}
