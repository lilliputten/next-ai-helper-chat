import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { GigaChat } from 'langchain-gigachat';

import { getAIClient } from '@/lib/getAIClient';

async function countTokensWithLangchainGigachat() {
  const client = await getAIClient();

  const textToCount = ['Hello world', 'This is a test message'];

  // Use getNumTokens method to count tokens
  const tokenCount = await client.getNumTokens(textToCount.join(' '));

  // eslint-disable-next-line no-console
  console.log('[count-tokens] Tokens count:', tokenCount);
}

// eslint-disable-next-line no-console
countTokensWithLangchainGigachat().catch(console.error);
