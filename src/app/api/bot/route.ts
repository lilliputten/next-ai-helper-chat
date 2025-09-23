import { webhookCallback } from 'grammy';

import { getBot } from '@/features/bot/helpers/getBot';

import { authorizeCommand } from './authorizeCommand';
import { helpCommand } from './helpCommand';
import { startCommand } from './startCommand';

export const dynamic = 'force-dynamic';

export const fetchCache = 'force-no-store';

const bot = getBot();

bot.command('start', startCommand);
bot.command('help', helpCommand);
bot.command('authorize', authorizeCommand);

// Test
bot.on('message:text', async (ctx) => {
  const { message } = ctx;
  const { text } = message;
  const replyText = [
    `${text} command is not implemented, sorry.`,
    'Check the available commands list via /help.',
  ].join('\n\n');
  await ctx.reply(replyText);
});

export const POST = webhookCallback(bot, 'std/http');
