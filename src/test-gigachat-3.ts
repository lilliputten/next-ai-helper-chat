import { HumanMessage, SystemMessage } from '@langchain/core/messages';

import { getAIClient } from '@/lib/getAIClient';

async function testAiClient() {
  try {
    const client = await getAIClient();

    const messages = [
      new SystemMessage('Translate the following message to Russian language'),
      new HumanMessage('Hello!'),
      // new SystemMessage('Переведи следующее сообщение на английский'),
      // new HumanMessage('Привет!'),
    ];

    const res = await client.invoke(messages);

    const tokenUsage = res.response_metadata?.tokenUsage;

    console.log('[getAiClient] ✅ Sucess:', res.content, tokenUsage);
    debugger;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    // eslint-disable-next-line no-console
    console.error('[getAiClient] ❌ Error:', message, {
      error,
      errorJson: JSON.stringify(error, null, 2),
    });
    debugger; // eslint-disable-line no-debugger
    // throw error;
  }
}

testAiClient();
