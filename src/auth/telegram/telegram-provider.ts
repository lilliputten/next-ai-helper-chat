import { CommonProviderOptions, CredentialInput } from '@auth/core/providers';
import { Awaitable } from '@auth/core/types';

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
  // server?: AllTransportOptions;
  // sendVerificationRequest: (params: {
  //   identifier: string;
  //   url: string;
  //   expires: Date;
  //   provider: TelegramProviderConfig;
  //   token: string;
  //   theme: Theme;
  //   request: Request;
  // }) => Awaitable<void>;
  options?: TelegramProviderUserConfig;
}

export type TelegramProviderUserConfig = Omit<Partial<TelegramProviderConfig>, 'options' | 'type'>;

export default function TelegramProvider(
  config: TelegramProviderUserConfig = {},
): TelegramProviderConfig {
  // if (!config.server) throw new AuthError('TelegramProvider requires a `server` configuration');

  return {
    id: 'telegram',
    type: 'credentials',
    name: 'TelegramProvider',
    maxAge: 24 * 60 * 60,
    options: config,
  };
}

export async function verifyTelegramToken(credentials: Record<string, unknown>) {
  const {
    // ???
    token,
    telegramUserId,
  } = credentials;
  console.log('[credentials:verifyTelegramToken]', {
    credentials,
  });
  debugger;
  return null;
}
