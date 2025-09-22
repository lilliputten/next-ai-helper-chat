import { randomBytes } from 'crypto';
import { Context } from 'grammy';

import { BOT_TOKEN, PUBLIC_URL, WEBHOOK_HOST } from '@/config/envServer';
import { prisma } from '@/lib/db';
import { isDev } from '@/config';
import { minuteMs } from '@/constants';
import { getBot } from '@/features/bot/helpers/getBot';

const expireTime = 60 * minuteMs;

async function getTelegramUseAvatarUrl(userId: number) {
  const bot = getBot();
  const photos = await bot.api.getUserProfilePhotos(userId, { limit: 1 });
  const firstPhoto = photos.photos[0];

  if (firstPhoto) {
    // Selecting smallest photo size, e.g., index 0 or 1 (say 160x160)
    const idx = Math.min(1, firstPhoto.length);
    const fileId = firstPhoto[idx].file_id;
    if (fileId) {
      const file = await bot.api.getFile(fileId);
      if (file) {
        const image = `https://api.telegram.org/file/bot${BOT_TOKEN}/${file.file_path}`;
        /* console.log('[src/app/api/bot/authorize.ts:handleAuthorizeCommand] image', {
         *   idx,
         *   fileId,
         *   file,
         *   image,
         * });
         */
        return image;
      }
    }
  }

  return undefined;
}

export async function handleAuthorizeCommand(ctx: Context) {
  const from = ctx.from;

  if (!from?.id) {
    return await ctx.reply('Unable to identify user. Please try again.');
  }

  const {
    id,
    // is_bot, // false
    first_name, // 'Ig'
    last_name,
    language_code, // 'en'
    username, // 'lilliputten'
  } = from;

  try {
    // Generate verification token
    const token = randomBytes(32).toString('hex');
    const now = Date.now();
    const expires = new Date(now + expireTime);

    const name = [first_name, last_name].filter(Boolean).join(' ') || `@${username}`;

    const image = await getTelegramUseAvatarUrl(id);

    /* console.log('[src/app/api/bot/authorize.ts:handleAuthorizeCommand]', {
     *   image,
     *   name,
     *   id,
     *   username,
     *   first_name,
     *   last_name,
     *   is_bot,
     *   language_code,
     *   token,
     *   expires,
     *   ctx,
     * });
     */

    // Store verification token in database
    await prisma.verificationToken.create({
      // TODO: Add name, language and other parameters?
      data: {
        token,
        expires,
        identifier: String(id),
        name,
        locale: language_code,
        image,
      },
    });

    // Create authorization URL
    const callbackUrl = encodeURIComponent('/');
    const urlPath = `/api/auth/callback/telegram?callbackUrl=${callbackUrl}&token=${token}&id=${id}`;
    const authUrl = `${WEBHOOK_HOST}${urlPath}`;
    const localUrl = `${PUBLIC_URL}${urlPath}`;

    // TODO: To use `useFormattedDuration` or whatever else
    const expiredMins = Math.round(expireTime / minuteMs);

    const helloStr = ['Hello', name].filter(Boolean).join(' ') + '!';

    // @see https://core.telegram.org/bots/api#sendmessage
    await ctx.reply(
      [
        helloStr,
        `Click the link below to sign in:`,
        `${authUrl}`,
        isDev && localUrl,
        `This link will expire in ${expiredMins} minutes.`,
      ]
        .filter(Boolean)
        .join('\n\n'),
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
