import { getAiClient } from '@/lib/ai/getAiClient';

async function countTokensWithLangchainGigachat() {
  const client = await getAiClient();

  const textToCount = ['Hello world', 'This is a test message'];

  // Use getNumTokens method to count tokens
  const tokenCount = await client.getNumTokens(textToCount.join(' '));

  // eslint-disable-next-line no-console
  console.log('[count-tokens] Tokens count:', tokenCount);
}

// eslint-disable-next-line no-console
countTokensWithLangchainGigachat().catch(console.error);
