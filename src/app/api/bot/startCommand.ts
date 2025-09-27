import { Context } from 'grammy';

import { versionInfo } from '@/config';

import { authorizeCommand } from './authorizeCommand';

export async function startCommand(ctx: Context) {
  const startPayload = ctx.match;

  // Automatically authorize...
  if (startPayload === '/authorize') {
    await authorizeCommand(ctx);
    return;
  }

  await ctx.reply(
    [
      // Welcome message
      'Welcome!',
      'Use /authorize to sign in to the app.',
      `The bot version is: ${versionInfo}`,
    ].join('\n\n'),
  );
}
