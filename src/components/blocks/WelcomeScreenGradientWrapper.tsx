import React from 'react';

import { TPropsWithChildrenAndClassName } from '@/lib/types/react';
import { cn } from '@/lib/utils';
import { isDev } from '@/config';

export function WelcomeScreenGradientWrapper(props: TPropsWithChildrenAndClassName) {
  const { className, children } = props;
  return (
    <div
      className={cn(
        isDev && '__WelcomeScreenGradientWrapper', // DEBUG
        'bg-theme-500/10 relative flex flex-1 flex-col lg:overflow-auto',
        className,
      )}
    >
      <div
        className={cn(
          isDev && '__WelcomeScreenGradientWrapper_Gradient', // DEBUG
          'absolute top-0 right-0 bottom-0 left-0 lg:overflow-hidden',
          'welcome-screen-gradient',
        )}
      />
      {children}
    </div>
  );
}
