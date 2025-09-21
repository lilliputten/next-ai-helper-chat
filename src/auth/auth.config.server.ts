import type { NextAuthConfig } from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/nodemailer';
import Yandex from 'next-auth/providers/yandex';

// import CredentialsProvider from 'next-auth/providers/credentials';

import {
  EMAIL_FROM,
  EMAIL_HOST,
  EMAIL_HOST_PASSWORD,
  EMAIL_HOST_USER,
  EMAIL_PORT,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  YANDEX_CLIENT_ID,
  YANDEX_CLIENT_SECRET,
} from '@/config/envServer';
import { verifyTelegramToken } from './telegram/telegram-provider';

// import { envServer } from '@/env/envServer';

// import Resend from 'next-auth/providers/resend';
// import { sendVerificationRequest } from '@/lib/email';

// import { telegramProvider } from './telegram-provider';

export default {
  providers: [
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
    Yandex({
      clientId: YANDEX_CLIENT_ID,
      clientSecret: YANDEX_CLIENT_SECRET,
    }),
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    EmailProvider({
      server: {
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        auth: { user: EMAIL_HOST_USER, pass: EMAIL_HOST_PASSWORD },
      },
      from: EMAIL_FROM,
      // Optionally set maxAge for magic link expiration (in seconds)
      // maxAge: 24 * 60 * 60, // 24 hours
      // sendVerificationRequest // https://next-auth.js.org/providers/email#customizing-emails
      // normalizeIdentifier // https://next-auth.js.org/providers/email#normalizing-the-email-address
    }),
    // telegramProvider, // NOTE: Temporarily don't use it, as it's buggy
    /* // EXAMPLE 1: Using `credentials` provider
     * {
     *   id: 'telegram',
     *   name: 'Telegram',
     *   type: 'credentials',
     *   credentials: {
     *     token: { label: 'Token', type: 'text' },
     *     telegramUserId: { label: 'Telegram User ID', type: 'text' },
     *   },
     *   authorize: async (credentials) => {
     *     // Validate the token here against your database
     *     const user = await verifyTelegramToken(credentials);
     *     if (user) {
     *       return user; // Return user object to sign in
     *     }
     *     return null;
     *   },
     * },
     */
  ],
} satisfies NextAuthConfig;
