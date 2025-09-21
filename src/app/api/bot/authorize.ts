import { randomBytes } from 'crypto';
import { Context } from 'grammy';

import { WEBHOOK_HOST } from '@/config/envServer';
import { prisma } from '@/lib/db';
import { minuteMs } from '@/constants';

const expireTime = 10 * minuteMs;

export async function handleAuthorizeCommand(ctx: Context) {
  const from = ctx.from;

  if (!from?.id) {
    return await ctx.reply('Unable to identify user. Please try again.');
  }

  const {
    first_name, // 'Ig'
    last_name,
    id, // 490398083
    is_bot, // false
    language_code, // 'en'
    username, // 'lilliputten'
  } = from;

  // const identifier = ctx.from?.id?.toString();
  // const username = ctx.from?.username;
  // const firstName = ctx.from?.first_name;
  // const lastName = ctx.from?.last_name;

  try {
    // Generate verification token
    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + expireTime);

    const displayName = [first_name, last_name].filter(Boolean).join(' ') || `@${username}`;

    console.log('[src/app/api/bot/authorize.ts:handleAuthorizeCommand]', {
      displayName,
      id,
      username,
      first_name,
      last_name,
      is_bot, // false
      language_code, // 'en'
      token,
      expires,
      ctx,
    });

    // Store verification token in database
    await prisma.verificationToken.create({
      // TODO: Add name, language and other parameters?
      data: {
        token,
        identifier: String(id),
        name: displayName,
        locale: language_code,
        expires,
      },
    });

    // Create authorization URL
    const callbackUrl = encodeURIComponent('/');
    const authUrl = `${WEBHOOK_HOST}/api/auth/callback/telegram?callbackUrl=${callbackUrl}&token=${token}&id=${id}`;

    // TODO: To use `useFormattedDuration` or whatever else
    const expiredMins = Math.round(expireTime / minuteMs);

    const helloStr = ['Hello', displayName].filter(Boolean).join(' ') + '!';

    // @see https://core.telegram.org/bots/api#sendmessage
    await ctx.reply(
      [
        helloStr,
        `Click the link below to sign in:`,
        `${authUrl}`,
        `This link will expire in ${expiredMins} minutes.`,
      ].join('\n\n'),
      {
        // parse_mode: 'Markdown',
        link_preview_options: { is_disabled: true },
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '🔐 Sign In',
                url: authUrl,
              },
            ],
          ],
        },
      },
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[src/app/api/bot/authorize.ts:handleAuthorizeCommand]', {
      error,
    });
    // eslint-disable-next-line no-debugger
    debugger;
    await ctx.reply(
      'An error occurred while generating your authorization link. Please try again.',
    );
  }
}
