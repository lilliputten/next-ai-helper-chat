import { Bot, webhookCallback } from 'grammy';

import { BOT_TOKEN } from '@/config/envServer';

export const dynamic = 'force-dynamic';

export const fetchCache = 'force-no-store';

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN environment variable not found.');
}

const bot = new Bot(BOT_TOKEN);

bot.on('message:text', async (ctx) => {
  const { message } = ctx;
  const { text } = message;
  console.log('[src/app/api/bot/route:message:text]', {
    text,
    message,
    ctx,
  });
  const replyText = `Reply: ${text}`;
  await ctx.reply(replyText);
});

export const POST = webhookCallback(bot, 'std/http');
