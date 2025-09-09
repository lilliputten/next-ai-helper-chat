import { HumanMessage, SystemMessage } from '@langchain/core/messages';

import { getCommunityAIClient } from '@/lib/getCommunityAIClient';

async function testAiClient() {
  try {
    const client = await getCommunityAIClient();

    const messages = [
      new SystemMessage('Translate the following message to Russian language'),
      new HumanMessage('Hello!'),
    ];

    // Convert messages to string since HuggingFaceInference only accepts strings
    const prompt = messages.map((msg) => `${msg.constructor.name}: ${msg.content}`).join('\n');
    const res = await client.invoke(prompt);

    // NOTE: Hugging Face provider doesn't work

    // eslint-disable-next-line no-console
    console.log('[getAiClient] ✅ Success:', {
      res,
      prompt,
      messages,
    });
    // eslint-disable-next-line no-debugger
    debugger;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const errorJson = JSON.stringify(error, null, 2);
    // eslint-disable-next-line no-console
    console.error('[getAiClient] ❌ Error:', message, {
      error,
      errorJson,
    });
    debugger; // eslint-disable-line no-debugger
    // throw error;
  }
}

testAiClient();
