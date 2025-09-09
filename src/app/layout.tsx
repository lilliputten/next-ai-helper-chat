import React from 'react';

import { cn } from '@/lib/utils';
import { isDev } from '@/config';

import './globals.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
