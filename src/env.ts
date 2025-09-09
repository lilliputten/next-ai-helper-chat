import dotenv from 'dotenv';

dotenv.config();

// GigaChat
export const GIGACHAT_CREDENTIALS = process.env.GIGACHAT_CREDENTIALS || '';
export const GIGACHAT_BASE_URL =
  process.env.GIGACHAT_BASE_URL || 'https://gigachat.devices.sberbank.ru/api/v1';
export const GIGACHAT_SCOPE = process.env.GIGACHAT_SCOPE || 'GIGACHAT_API_PERS';
export const GIGACHAT_MODEL = process.env.GIGACHAT_MODEL || 'GigaChat-Pro';

// CloudFlare

export const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '';
export const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || '';

// DeepSeek
export const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';

// Hugging Face
export const HUGGINGFACEHUB_API_KEY = process.env.HUGGINGFACEHUB_API_KEY || '';

// System
export const DEV_CLIENT_HOST = process.env.DEV_CLIENT_HOST || 'http://localhost:5173';

export const dataContentType = 'application/json; charset=utf-8';
export const VERCEL_URL = process.env.VERCEL_URL || '';
export const PORT = process.env.PORT || 3000;

export const ORIGIN_HOST = VERCEL_URL || DEV_CLIENT_HOST;

export const DATABASE_URL = process.env.DATABASE_URL || '';

export const isVercel = !!VERCEL_URL;
export const isDev = process.env.NODE_ENV === 'development' || process.argv?.includes('--dev');
// NOTE: Beware direct console invocation
export const isProd = !isDev;

/** Configuration slot id */
export const CONFIG_ID =
  process.env.CONFIG_ID && !isNaN(Number(process.env.CONFIG_ID))
    ? Number(process.env.CONFIG_ID)
    : 1;
