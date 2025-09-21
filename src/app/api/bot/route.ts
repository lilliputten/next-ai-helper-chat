import { Bot, webhookCallback } from 'grammy';

import { BOT_TOKEN } from '@/config/envServer';

import { handleAuthorizeCommand } from './authorize';

export const dynamic = 'force-dynamic';

export const fetchCache = 'force-no-store';

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN environment variable not found.');
}

const bot = new Bot(BOT_TOKEN);

bot.command('start', async (ctx) => {
  const startPayload = ctx.match;

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
  console.log('[src/app/api/bot/route:message:text]', {
    text,
    message,
    ctx,
  });
  debugger;
  const replyText = `Reply: ${text}`;
  await ctx.reply(replyText);
});

export const POST = webhookCallback(bot, 'std/http');
