/* eslint-disable no-debugger, no-console */

import { HUGGINGFACEHUB_API_KEY } from '@/env';

async function testHuggingFaceConnectivity() {
  try {
    console.log('[connectivity] Testing Hugging Face API accessibility...');

    const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
      method: 'HEAD',
      headers: {
        Authorization: `Bearer ${HUGGINGFACEHUB_API_KEY}`,
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    console.log('[connectivity] Response status:', response.status);
    console.log('[connectivity] Response headers:', response.headers);

    if (response.ok) {
      console.log('[connectivity] ✅ Hugging Face API is accessible');
    } else {
      console.log('[connectivity] ❌ Hugging Face API returned error status');
    }
    debugger;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    console.error('[connectivity] ❌ Cannot reach Hugging Face API:', message);
    debugger;
    console.log('[connectivity] This suggests the API may be blocked in your region');
  }
}

testHuggingFaceConnectivity();
