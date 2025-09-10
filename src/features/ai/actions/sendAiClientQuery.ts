'use server';

import { AIMessageChunk, HumanMessage, SystemMessage } from '@langchain/core/messages';

import { getAiClient } from '@/lib/ai/getAiClient';
import { TAiClientType } from '@/lib/types/TAiClientType';

import { TPlainMessage } from '../types/messages';

type TDataType = Pick<
  AIMessageChunk,
  | 'content'
  | 'name'
  | 'additional_kwargs'
  | 'response_metadata'
  | 'id'
  | 'tool_calls'
  | 'invalid_tool_calls'
  | 'usage_metadata'
>;

type TGenericMessage = HumanMessage | SystemMessage;

export async function sendAiClientQuery(
  clientType: TAiClientType,
  messages: TPlainMessage[],
  __returnDebugData: boolean = false,
) {
  if (__returnDebugData) {
    await new Promise((r) => setTimeout(r, 2000));
    const rawData = await import('./sendAiClientQuery-sample-data.json');
    const data = { ...rawData.default } as TDataType;
    return data;
  }
  const prepartedMessages: TGenericMessage[] = messages.map(({ type, text }) => {
    if (type === 'system') {
      return new SystemMessage(text);
    }
    return new HumanMessage(text);
  });
  const client = await getAiClient(clientType);
  const res = await client.invoke(prepartedMessages);
  const {
    // lc_serializable,
    // lc_kwargs,
    // lc_namespace,
    content,
    name,
    additional_kwargs,
    response_metadata,
    id,
    tool_calls,
    invalid_tool_calls,
    usage_metadata,
  } = res;
  const data: TDataType = {
    content,
    name,
    additional_kwargs,
    response_metadata,
    id,
    tool_calls,
    invalid_tool_calls,
    usage_metadata,
  };
  // DEBUG
  // const resJson = JSON.stringify(res, null, 2);
  // const dataJson = JSON.stringify(data, null, 2);
  console.log('[sendAiClientQuery]', {
    res,
    // resJson,
    // dataJson,
  });
  return data;
}
