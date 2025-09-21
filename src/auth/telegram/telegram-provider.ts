import { CommonProviderOptions, Provider } from '@auth/core/providers';
import { Awaitable } from '@auth/core/types';

import { prisma } from '@/lib/db';
import { getErrorText } from '@/lib/helpers';

// import { createTransport } from 'nodemailer';
// import type { Transport, TransportOptions } from 'nodemailer';
// import * as JSONTransport from 'nodemailer/lib/json-transport/index.js';
// import * as SendmailTransport from 'nodemailer/lib/sendmail-transport/index.js';
// import * as SESTransport from 'nodemailer/lib/ses-transport/index.js';
// import * as SMTPPool from 'nodemailer/lib/smtp-pool/index.js';
// import * as SMTPTransport from 'nodemailer/lib/smtp-transport/index.js';
// import * as StreamTransport from 'nodemailer/lib/stream-transport/index.js';

// import { AuthError } from '../errors.js';
// import { html, text } from '../lib/utils/email.js';
// import type { EmailConfig } from './email.js';

// type AllTransportOptions =
//   | string
//   | SMTPTransport
//   | SMTPTransport.Options
//   | SMTPPool
//   | SMTPPool.Options
//   | SendmailTransport
//   | SendmailTransport.Options
//   | StreamTransport
//   | StreamTransport.Options
//   | JSONTransport
//   | JSONTransport.Options
//   | SESTransport
//   | SESTransport.Options
//   | Transport<any>
//   | TransportOptions;

export interface ProviderConfig extends CommonProviderOptions {
  // id: string;
  // type: 'credentials';
  // name: string;
  // from?: string;
  maxAge?: number;
  // sendVerificationRequest: (params: EmailProviderSendVerificationRequestParams) => Awaitable<void>;
  /** Used to hash the verification token. */
  secret?: string;
  /** Used with HTTP-based email providers. */
  apiKey?: string;
  /** Used with SMTP-based email providers. */
  // server?: NodemailerConfig['server'];
  generateVerificationToken?: () => Awaitable<string>;
  normalizeIdentifier?: (identifier: string) => string;
  // options?: EmailUserConfig;
}

export interface TelegramProviderConfig extends ProviderConfig {
  credentials: {
    token: { label: 'Token'; type: 'text' };
    identifier: { label: 'Telegram User ID'; type: 'text' };
  };
  authorize: typeof verifyTelegramToken;
}

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
      debugger;
      return await verifyTelegramToken(credentials || {});
    },
  };
}

export interface TTelegramCredentials {
  token?: string;
  identifier?: string;
}

export async function verifyTelegramToken(credentials: TTelegramCredentials) {
  const { token, identifier } = credentials;

  console.log('[src/auth/telegram/telegram-provider.ts:verifyTelegramToken]', {
    token,
    identifier,
    credentials,
  });

  try {
    if (!token) {
      debugger;
      throw new Error('Auth token is undefined');
    }
    if (!token || !identifier) {
      debugger;
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
      debugger;
      throw new Error('Verification token not found or expired');
    }

    const { name, locale } = verificationToken;

    // Delete the used token
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: identifier as string,
          token: token as string,
        },
      },
    });

    const id = identifier;
    // const email = identifier; // Use telegram ID as email identifier?
    console.log('[src/auth/telegram/telegram-provider.ts:verifyTelegramToken] Done', {
      id,
      // email,
      name,
      locale,
    });
    debugger;

    // Return user object
    return {
      id,
      // email, // Use telegram ID as email identifier
      name,
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
    // return null;
    // Error: step 1
    throw new Error(errMsg);
  }
}
