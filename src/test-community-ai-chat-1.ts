import { getCommunityAIClient } from '@/lib/getCommunityAIClient';

async function testClient() {
  try {
    const client = await getCommunityAIClient();

    const res = await client.invoke(
      'Question: What would be a good company name for a colorful socks brand?\nAnswer:',
    );

    // NOTE: Hugging Face provider doesn't work

    // eslint-disable-next-line no-console
    console.log('[testClient] ✅ Success:', {
      res,
      // prompt,
      // messages,
    });
    // eslint-disable-next-line no-debugger
    debugger;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const errorJson = JSON.stringify(error, null, 2);
    // eslint-disable-next-line no-console
    console.error('[testClient] ❌ Error:', message, {
      error,
      errorJson,
    });
    debugger; // eslint-disable-line no-debugger
    // throw error;
  }
}

testClient();
