import React from 'react';

import { cn } from '@/lib/utils';
import { isDev } from '@/config';

import './globals.scss';

import { defaultLanguage } from '@/constants';

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
        <div
          className={cn(
            isDev && '__RootLayout_Wrapper', // DEBUG
            'p-5',
          )}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
