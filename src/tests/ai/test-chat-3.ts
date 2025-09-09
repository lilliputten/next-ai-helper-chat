import { HumanMessage, SystemMessage } from '@langchain/core/messages';

import { getAiClient } from '@/lib/ai/getAiClient';

async function testClient() {
  try {
    const client = await getAiClient();

    const messages = [
      new SystemMessage('Translate the following message to Russian language'),
      new HumanMessage('Hello!'),
      // new SystemMessage('Переведи следующее сообщение на английский'),
      // new HumanMessage('Привет!'),
    ];

    const res = await client.invoke(messages);

    const tokenUsage = res.response_metadata?.tokenUsage;

    // eslint-disable-next-line no-console
    console.log('[testClient] ✅ Success:', res.content, tokenUsage);
    debugger; // eslint-disable-line no-debugger
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    // eslint-disable-next-line no-console
    console.error('[testClient] ❌ Error:', message, {
      error,
      errorJson: JSON.stringify(error, null, 2),
    });
    debugger; // eslint-disable-line no-debugger
    // throw error;
  }
}

testClient();
