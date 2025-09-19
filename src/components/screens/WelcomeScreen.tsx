'use client';

import React from 'react';

import { TPropsWithClassName } from '@/lib/types/react';
import { cn } from '@/lib/utils';
import { SignInBlock } from '@/components/blocks/SignInBlock';
import { WelcomeVisualBlock } from '@/components/blocks/WelcomeVisualBlock';
import { isDev } from '@/config';

export function WelcomeScreen(props: TPropsWithClassName & { isLoggedUser: boolean }) {
  const { className, isLoggedUser } = props;
  return (
    <div
      className={cn(
        isDev && '__WelcomeScreen', // DEBUG
        className,
        'lg:layout-follow flex flex-1 flex-col items-stretch justify-stretch gap-4 overflow-auto lg:flex-row lg:overflow-hidden',
      )}
    >
      <div
        className={cn(
          isDev && '__WelcomeScreen_Info', // DEBUG
          'bg-theme-500/10 relative flex flex-1 flex-col lg:overflow-auto',
        )}
      >
        <div
          className={cn(
            isDev && '__WelcomeScreen_Gradient', // DEBUG
            'absolute top-0 right-0 bottom-0 left-0 lg:overflow-hidden',
            'welcome-screen-gradient',
          )}
        />
        <WelcomeVisualBlock className="z-10" />
      </div>
      {!isLoggedUser && (
        <div
          className={cn(
            isDev && '__WelcomeScreen_SignIn', // DEBUG
            'flex flex-1 flex-col lg:overflow-auto',
          )}
        >
          <SignInBlock />
        </div>
      )}
    </div>
  );
}
