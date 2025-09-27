import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

import '@/app/serverStartUp';

import { BOT_USERNAME } from '@/config/envServer';
import { isDev } from '@/config';

import '@/styles/globals.scss';
import '@/styles/root-layout.scss';

import { GenericLayout } from '@/components/layout/GenericLayout';
import ModalProvider from '@/components/modals/providers';
import { ReactQueryClientProvider } from '@/components/providers/ReactQueryClientProvider';
import { TailwindIndicator } from '@/components/service/TailwindIndicator';
import { defaultLanguage } from '@/constants';
import { EnvProvider } from '@/contexts/EnvContext';

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
        data-layout="clippable"
        className={cn(
          isDev && '__RootLayout_Body', // DEBUG
        )}
      >
        <ReactQueryClientProvider>
          <SessionProvider>
            <EnvProvider botUsername={BOT_USERNAME}>
              <ThemeProvider
                attribute="class"
                // forcedTheme="light" // DEBUG: Force specific theme
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
                // storageKey="app-theme"
              >
                <ModalProvider>
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
                  <GenericLayout>
                    {/* Core content */}
                    {children}
                  </GenericLayout>
                  <TailwindIndicator />
                </ModalProvider>
              </ThemeProvider>
            </EnvProvider>
          </SessionProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
