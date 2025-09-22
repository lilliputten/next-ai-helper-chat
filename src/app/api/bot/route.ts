import { webhookCallback } from 'grammy';

import { getBot } from '@/features/bot/helpers/getBot';

import { handleAuthorizeCommand } from './authorize';

export const dynamic = 'force-dynamic';

export const fetchCache = 'force-no-store';

const bot = getBot();

bot.command('start', async (ctx) => {
  const startPayload = ctx.match;

  // Automatically authorize...
  if (startPayload === '/authorize') {
    await handleAuthorizeCommand(ctx);
    return;
  }

  await ctx.reply('Welcome! Use /authorize to sign in to the app.');
});

bot.command('authorize', async (ctx) => {
  await handleAuthorizeCommand(ctx);
});

bot.on('message:text', async (ctx) => {
  const { message } = ctx;
  const { text } = message;
  /* console.log('[src/app/api/bot/route:message:text]', {
   *   text,
   *   message,
   *   ctx,
   * });
   */
  const replyText = `Reply: ${text}`;
  await ctx.reply(replyText);
});

export const POST = webhookCallback(bot, 'std/http');
