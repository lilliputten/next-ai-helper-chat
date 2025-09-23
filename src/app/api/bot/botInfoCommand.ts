import { Context } from 'grammy';

import { BOT_ADMIN_USERID } from '@/config/envServer';

export async function botInfoCommand(ctx: Context) {
  const { from } = ctx;
  const id = from?.id;
  if (!id) {
    return await ctx.reply('Unable to identify user. Please try again.');
  }
  if (id !== BOT_ADMIN_USERID) {
    return await ctx.reply('The command is forbidden.');
  }

  const text = JSON.stringify(ctx, null, 4);

  await ctx.reply(text);
}
