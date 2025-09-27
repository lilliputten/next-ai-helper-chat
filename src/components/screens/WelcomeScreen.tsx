'use client';

import React from 'react';

import { TPropsWithClassName } from '@/lib/types/react';
import { cn } from '@/lib/utils';
import { SignInBlock } from '@/components/blocks/SignInBlock';
import { WelcomeVisualBlock } from '@/components/blocks/WelcomeVisualBlock';
import { isDev } from '@/config';

import { WelcomeScreenGradientWrapper } from '../blocks/WelcomeScreenGradientWrapper';
import { SmallWelcomeText } from './SmallWelcomeText';

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
      <WelcomeScreenGradientWrapper>
        <WelcomeVisualBlock>
          <SmallWelcomeText className="mb-5" />
        </WelcomeVisualBlock>
      </WelcomeScreenGradientWrapper>
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
