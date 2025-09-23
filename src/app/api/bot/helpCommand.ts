import { Context } from 'grammy';

import { botCommands } from '@/features/bot/constants/botCommands';

export async function helpCommand(ctx: Context) {
  const cmdsList = botCommands.map(({ command, description }) => `/${command} - ${description}`);
  return await ctx.reply(
    [
      // Commands list...
      '*AVAILABLE COMMANDS:*',
      cmdsList.join('\n'),
    ].join('\n\n'),
    { parse_mode: 'Markdown' },
  );
}
