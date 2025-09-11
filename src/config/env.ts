// This file should only be used in client components
import { ensureBoolean } from '@/lib/helpers/types';
import appInfo from '@/app-info.json';

// System
export const versionInfo = appInfo.versionInfo;

// Environment
export const isLocal = ensureBoolean(process.env.NEXT_PUBLIC_LOCAL);
export const isDev = process.env.NODE_ENV === 'development' || !!isLocal;
// NOTE: Beware direct console invocation
export const isProd = !isDev;

// Other params...
export const defaultLanguage = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE || 'en';

export const dataContentType = 'application/json; charset=utf-8';
