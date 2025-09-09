import { HuggingFaceInference } from '@langchain/community/llms/hf';

import {
  // DEEPSEEK_API_KEY,
  HUGGINGFACEHUB_API_KEY,
  // GIGACHAT_CREDENTIALS,
  // GIGACHAT_MODEL,
} from '@/env';

export type TCommunityAIClient = HuggingFaceInference;

let client: TCommunityAIClient | undefined;

// Create client instance
export async function getCommunityAIClient() {
  if (client) {
    return client;
  }
  try {
    // Hugging Face LLM (string input only)
    client = new HuggingFaceInference({
      model: 'gpt2',
      endpointUrl: 'https://api-inference.huggingface.co/models/gpt2',
      temperature: 0.7,
      maxTokens: 50,
      apiKey: HUGGINGFACEHUB_API_KEY,
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
    console.error('[getCommunityAIClient:getCommunityAIClient] ❌ Error:', error);
    debugger; // eslint-disable-line no-debugger
    throw error;
  }
}
