import { Laptop, Moon, Sun } from '@/components/shared/Icons';
import { TGenericIcon } from '@/components/shared/IconTypes';

export const systemThemeIds = ['light', 'dark', 'system'] as const;
export type TSystemThemeId = (typeof systemThemeIds)[number];
export const defaultSystemTheme: TSystemThemeId = 'system';
export const systemThemeIcons: Record<TSystemThemeId, TGenericIcon> = {
  light: Sun,
  dark: Moon,
  system: Laptop,
};
