// Next.js automatically loads .env files, no need for dotenv.config()
// import dotenv from 'dotenv';
// dotenv.config();

// GigaChat API
export const GIGACHAT_CREDENTIALS = process.env.GIGACHAT_CREDENTIALS || '';
// export const GIGACHAT_BASE_URL = process.env.GIGACHAT_BASE_URL || 'https://gigachat.devices.sberbank.ru/api/v1';
// export const GIGACHAT_SCOPE = process.env.GIGACHAT_SCOPE || 'GIGACHAT_API_PERS';
export const GIGACHAT_MODEL = process.env.GIGACHAT_MODEL || 'GigaChat';

// CloudFlare API

export const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '';
export const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || '';

// System

// import appInfo from '@/app-info.json';
// export const versionInfo = appInfo.versionInfo;

export const VERCEL_URL = process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : '';
export const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const PUBLIC_URL = VERCEL_URL || NEXT_PUBLIC_APP_URL;

export const DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE || 'en';

// export const DEV_CLIENT_HOST = process.env.DEV_CLIENT_HOST || 'http://localhost:3000';
// export const PORT = process.env.PORT || 3000;
// export const ORIGIN_HOST = VERCEL_URL || DEV_CLIENT_HOST;

// export const DATABASE_URL = process.env.DATABASE_URL || '';

export const dataContentType = 'application/json; charset=utf-8';

export const isVercel = !!VERCEL_URL;
export const isDev = process.env.NODE_ENV === 'development' || !!process.env.LOCAL;
// NOTE: Beware direct console invocation
export const isProd = !isDev;

/** Configuration slot id */
export const CONFIG_ID =
  process.env.CONFIG_ID && !isNaN(Number(process.env.CONFIG_ID))
    ? Number(process.env.CONFIG_ID)
    : 1;
