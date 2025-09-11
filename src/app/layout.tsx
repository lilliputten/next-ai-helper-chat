import React from 'react';
import { ThemeProvider } from 'next-themes';

import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { defaultLanguage, isDev } from '@/config';

import '@/styles/globals.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const { locale } = await params;
  const locale = defaultLanguage;
  return (
    <html
      lang={locale}
      // data-theme-color={themeColor}
      // style={{ colorScheme: theme }}
      // className={theme}
      suppressHydrationWarning
    >
      <body
        className={cn(
          isDev && '__RootLayout_Body', // DEBUG
        )}
      >
        <ThemeProvider
          attribute="class"
          // forcedTheme="light" // DEBUG: Force specific theme
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          // storageKey="app-theme"
        >
          {/* NOTE: The toaster should be located before the main content */}
          <Toaster
            // @see https://sonner.emilkowal.ski/toaster#api-reference
            expand
            richColors
            closeButton
            theme="dark"
            // invert?: boolean;
            // theme?: 'light' | 'dark' | 'system';
            // position?: Position;
            // hotkey?: string[];
            // richColors?: boolean;
            // expand?: boolean;
            // duration?: number;
            // gap?: number;
            // visibleToasts?: number;
            // closeButton?: boolean;
            // toastOptions?: ToastOptions;
            // className?: string;
            // style?: React.CSSProperties;
            // offset?: Offset;
            // mobileOffset?: Offset;
            // dir?: 'rtl' | 'ltr' | 'auto';
            // swipeDirections?: SwipeDirection[];
            // icons?: ToastIcons;
            // containerAriaLabel?: string;
            // pauseWhenPageIsHidden?: boolean;
          />
          <div
            className={cn(
              isDev && '__RootLayout_Wrapper', // DEBUG
              'p-5',
            )}
          >
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
