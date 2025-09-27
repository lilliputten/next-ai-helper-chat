// import i18n from 'i18next';
// import { useTranslation } from 'react-i18next';

import { defaultLanguage as configDefaultLanguage } from '@/config';

export const usedLanguages = ['en', 'ru'] as const;
export type TLng = (typeof usedLanguages)[number];
export type TLngOpts = { lng: TLng };
export const languageNames: Record<TLng, string> = {
  en: 'English',
  ru: 'Русский',
};
// const hashLanguage = window.location.search.substring(1) as TLng;
// const isValidHashLanguage = usedLanguages.includes();
// const failbackLanguage: TLng = (defaultLanguage || 'en') as TLng;

export const defaultLanguage: TLng = configDefaultLanguage as TLng;

export function useLanguage() {
  // const { i18n } = useTranslation();
  // return i18n.language as TLng;
  return defaultLanguage;
}

export function getLanguage() {
  // return i18n.language as TLng;
  return defaultLanguage;
}
