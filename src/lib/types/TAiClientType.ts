export const aiClientTypes = [
  // ChatCloudflareWorkersAI
  'Cloudflare',
  // GigaChat
  'GigaChat',
] as const;
export type TAiClientType = (typeof aiClientTypes)[number];
export const defaultAiClientType: TAiClientType = 'GigaChat';
