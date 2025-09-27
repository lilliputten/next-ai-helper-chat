import { getGigaChatAvailableTokens } from '@/lib/ai/getGigaChatAvailableTokens';

async function getAvailableTokens() {
  try {
    const tokens = await getGigaChatAvailableTokens();
    // eslint-disable-next-line no-console
    console.log('[get-available-tokens] Available tokens:', tokens);
    // eslint-disable-next-line no-debugger
    debugger;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[get-available-tokens] ❌ Error:', error);
    debugger; // eslint-disable-line no-debugger
  }
}

// eslint-disable-next-line no-console
getAvailableTokens().catch(console.error);
