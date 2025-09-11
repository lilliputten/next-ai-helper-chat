// This file should only be used in server components

import { z } from 'zod';

import { ensureBoolean } from '@/lib/helpers/types';

const envSchema = z.object({
  // Vercel
  VERCEL_PROJECT_PRODUCTION_URL: z.string().optional(),
  VERCEL_URL: z.string().optional(),
  VERCEL_ENV: z.string().optional(),

  // Environment
  NEXT_PUBLIC_APP_URL: z.string().optional(),

  // Auth
  BOT_USERNAME: z.string().min(1),
  BOT_USERNAME_PREVIEW: z.string().optional(),
  BOT_USERNAME_LOCAL: z.string().optional(),
  BOT_TOKEN: z.string().min(1),
  BOT_TOKEN_PREVIEW: z.string().optional(),
  BOT_TOKEN_LOCAL: z.string().optional(),
  WEBHOOK_HOST: z.string().optional(),

  // GigaChat AI API
  GIGACHAT_CREDENTIALS: z.string().min(1),
  GIGACHAT_MODEL: z.string().min(1),
  // CloudFlare AI API
  CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
  CLOUDFLARE_API_TOKEN: z.string().min(1),

  // // Prisma
  // DATABASE_URL: z.string().min(1),
  // CONFIG_ID: z.number().optional(), // Default config slot
  //
  // Authentication (NextAuth.js)
  // @see https://nextjs.org/learn/dashboard-app/adding-authentication
  // AUTH_SECRET: z.string().min(1),
  // NEXTAUTH_URL: z.string().url().optional(),
  // GITHUB_CLIENT_ID: z.string().min(1),
  // GITHUB_CLIENT_SECRET: z.string().min(1),
  // GOOGLE_CLIENT_ID: z.string().min(1),
  // GOOGLE_CLIENT_SECRET: z.string().min(1),
  // YANDEX_CLIENT_ID: z.string().min(1),
  // YANDEX_CLIENT_SECRET: z.string().min(1),
  // RESEND_API_KEY: z.string().min(1),
  // EMAIL_FROM: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);
export type TEnvServer = z.infer<typeof envSchema>;

if (!parsedEnv.success) {
  const error = new Error('Invalid server environment variables');
  // eslint-disable-next-line no-console
  console.error(error.message, parsedEnv.error.flatten().fieldErrors, parsedEnv);
  debugger; // eslint-disable-line no-debugger
  throw error;
}

const envServer = parsedEnv.data;

export const {
  NEXT_PUBLIC_APP_URL,
  GIGACHAT_CREDENTIALS,
  GIGACHAT_MODEL,
  CLOUDFLARE_ACCOUNT_ID,
  CLOUDFLARE_API_TOKEN,
  VERCEL_ENV,
} = envServer;

export const isLocal = ensureBoolean(process.env.NEXT_PUBLIC_LOCAL);
export const isDev = process.env.NODE_ENV === 'development' || !!isLocal;

// Derived variables
export const PUBLIC_URL = envServer.VERCEL_URL
  ? 'https://' + envServer.VERCEL_URL
  : NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const isVercel = !!envServer.VERCEL_URL;
export const isVercelPreview = isVercel && VERCEL_ENV === 'preview';
export const isVercelProduction = isVercel && VERCEL_ENV === 'production';

export const WEBHOOK_HOST = envServer.WEBHOOK_HOST || PUBLIC_URL;

export const BOT_USERNAME =
  isDev && envServer.BOT_USERNAME_LOCAL
    ? envServer.BOT_USERNAME_LOCAL
    : isVercelPreview && envServer.BOT_USERNAME_PREVIEW
      ? envServer.BOT_USERNAME_PREVIEW
      : envServer.BOT_USERNAME;
export const BOT_TOKEN =
  isDev && envServer.BOT_TOKEN_LOCAL
    ? envServer.BOT_TOKEN_LOCAL
    : isVercelPreview && envServer.BOT_TOKEN_PREVIEW
      ? envServer.BOT_TOKEN_PREVIEW
      : envServer.BOT_TOKEN;

/* // DEBUG: Show environment (will appear in build logs)
 * console.log('[envServer]', {
 *   WEBHOOK_HOST,
 *   GIGACHAT_CREDENTIALS,
 *   GIGACHAT_MODEL,
 *   CLOUDFLARE_ACCOUNT_ID,
 *   CLOUDFLARE_API_TOKEN,
 *   PUBLIC_URL,
 *   isVercel,
 *   isVercelPreview,
 *   isVercelProduction,
 *   BOT_USERNAME,
 *   BOT_TOKEN,
 *   envServer,
 * });
 */
