import { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { isDev } from '@/config';

export function MaxWidthWrapper({
  className,
  children,
  large = false,
}: {
  className?: string;
  large?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        isDev && '__MaxWidthWrapper', // DEBUG
        className,
        'container',
        large ? 'max-w-screen-2xl' : 'max-w-6xl',
      )}
    >
      {children}
    </div>
  );
}
