'use client';

import React from 'react';

import { contactsRoute } from '@/config/routesConfig';
import { TPropsWithClassName } from '@/lib/types/react';
import { cn } from '@/lib/utils';
import { WelcomeScreenGradientWrapper } from '@/components/blocks/WelcomeScreenGradientWrapper';
import { WelcomeVisualBlock } from '@/components/blocks/WelcomeVisualBlock';
import { TInvalidEmailReason } from '@/auth';
import { isDev } from '@/config';
import { Link } from '@/i18n/routing';

const reasonExplanations: Record<TInvalidEmailReason, string> = {
  NO_EMAIL: 'The email address is not specified for the account.',
  UNKNOWN_EMAIL: 'The email address is not in the allowed list.',
};

export function DemoInfoScreen(props: TPropsWithClassName & { reason?: TInvalidEmailReason }) {
  const { className, reason } = props;
  const reasonText = reason && reasonExplanations[reason];
  return (
    <WelcomeScreenGradientWrapper
      className={cn(
        isDev && '__DemoInfoScreen', // DEBUG
        'oberflow-hidden flex-1',
        // 'lg:layout-follow flex flex-1 flex-col items-stretch justify-stretch gap-4 overflow-auto lg:flex-row lg:overflow-hidden',
        className,
      )}
    >
      <WelcomeVisualBlock>
        <div
          className={cn(
            isDev && '__DemoInfoScreen_Content', // DEBUG
            className,
            'gap-4 p-4',
            'text-content',
            'text-center', // Only for small texts
            'flex flex-col gap-4',
          )}
        >
          <h1>This project is in demo mode</h1>
          {reasonText && <p className="font-bold">{reasonText}</p>}
          <p>
            Ask <Link href={contactsRoute}>the administrator</Link> to include you into the testers
            list in order to use services.
          </p>
        </div>
      </WelcomeVisualBlock>
    </WelcomeScreenGradientWrapper>
  );
}
