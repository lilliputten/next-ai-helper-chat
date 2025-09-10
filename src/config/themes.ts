import { Laptop, LucideIcon, Moon, Sun } from 'lucide-react';

export const systemThemeIds = ['light', 'dark', 'system'] as const;
export type TSystemThemeId = (typeof systemThemeIds)[number];
export const defaultSystemTheme: TSystemThemeId = 'system';
export const systemThemeIcons: Record<TSystemThemeId, LucideIcon> = {
  light: Sun,
  dark: Moon,
  system: Laptop,
};
