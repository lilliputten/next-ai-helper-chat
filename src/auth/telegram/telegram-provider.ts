import { Provider } from '@auth/core/providers';

import { prisma } from '@/lib/db';
import { getErrorText } from '@/lib/helpers';
import { isDev } from '@/config';

export default function TelegramProvider(): Provider {
  return {
    id: 'telegram',
    type: 'credentials',
    name: 'Telegram',
    // maxAge: 24 * 60 * 60,
    credentials: {
      token: { label: 'Token', type: 'text' },
      identifier: { label: 'Telegram User ID', type: 'text' },
    },
    authorize: async (credentials) => {
      return await verifyTelegramToken(credentials || {});
    },
  };
}

export interface TTelegramCredentials {
  token?: string;
  identifier?: string;
}

const __debugKeepToken = false && isDev;

export async function verifyTelegramToken(credentials: TTelegramCredentials) {
  const { token, identifier } = credentials;

  try {
    if (!token) {
      throw new Error('Auth token is undefined');
    }
    if (!token || !identifier) {
      throw new Error('Auth identifier is undefined');
    }

    const now = new Date();

    // Delete all expired tokens
    await prisma.verificationToken.deleteMany({
      where: {
        expires: {
          lt: now,
        },
      },
    });

    // Find and verify the token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: identifier,
          token,
        },
      },
    });

    if (!verificationToken || verificationToken.expires < now) {
      throw new Error('Verification token not found or expired');
    }

    const { name, locale, image } = verificationToken;

    // Delete the used token
    if (!__debugKeepToken) {
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: identifier as string,
            token: token as string,
          },
        },
      });
    }

    const id = identifier;

    // Return user object
    return {
      id,
      name,
      image,
      locale,
    };
  } catch (error) {
    const errMsg = ['Token verification error', getErrorText(error)].filter(Boolean).join(': ');
    // eslint-disable-next-line no-console
    console.error('[src/auth/telegram/telegram-provider.ts:verifyTelegramToken]', errMsg, {
      token,
      identifier,
      credentials,
      error,
    });
    debugger; // eslint-disable-line no-debugger
    throw new Error(errMsg);
  }
}
