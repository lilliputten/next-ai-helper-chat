import Image from 'next/image';

import { TPropsWithChildrenAndClassName } from '@/lib/types/react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/ScrollArea';
import svgArt from '@/assets/arts/login-blue.svg';
import { isDev } from '@/config';

export function WelcomeVisualBlock(props: TPropsWithChildrenAndClassName) {
  const { className, children } = props;
  return (
    <ScrollArea
      className={cn(
        isDev && '__WelcomeVisualBlock', // DEBUG
        'gap-4',
        'flex flex-1 flex-col',
        'items-stretch',
        'justify-center',
        // 'overflow-auto',
        className,
      )}
      viewportClassName={cn(
        isDev && '__WelcomeVisualBlock_ScrollViewport', // DEBUG
        'flex flex-1 flex-col',
        '[&>div]:!flex [&>div]:flex-col [&>div]:gap-4 [&>div]:flex-1 [&>div]:justify-center',
      )}
    >
      <Image
        src={svgArt}
        alt="Sign in"
        className={cn(
          isDev && '__WelcomeVisualBlock_Art', // DEBUG
          'mt-4',
          'object-contain',
          'mx-auto',
          'max-lg:max-h-[200px]',
          'md:max-w-sm',
          'xl:max-w-md',
        )}
      />
      {/* // XXX: Alternate layout: the art as a background
      <div
        className={cn(
          isDev && '__WelcomeVisualBlock_Art', // DEBUG
          'bg-contain',
          'bg-center',
          'bg-no-repeat',
        )}
        style={{
          // minHeight: '40vw',
          minHeight: '50vh',
          backgroundImage: 'url(/static/arts/login-blue.svg)',
        }}
      />
      */}
      {children}
    </ScrollArea>
  );
}
