import type { NextAuthConfig } from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Yandex from 'next-auth/providers/yandex';

import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  YANDEX_CLIENT_ID,
  YANDEX_CLIENT_SECRET,
} from '@/config/envServer';

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
    /* Resend({
     *   apiKey: env.RESEND_API_KEY,
     *   from: env.EMAIL_FROM,
     *   sendVerificationRequest,
     * }),
     */
    // telegramProvider, // NOTE: Temporarily don't use it, as it's buggy
  ],
} satisfies NextAuthConfig;
