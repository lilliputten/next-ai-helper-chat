import Image from 'next/image';

import { TPropsWithClassName } from '@/lib/types/react';
import { cn } from '@/lib/utils';
import { SmallWelcomeText } from '@/components/screens/SmallWelcomeText';
import { isDev } from '@/config';

import svgArt from '/public/static/arts/login-blue.svg';

export function WelcomeVisualBlock(props: TPropsWithClassName) {
  const { className } = props;
  return (
    <div
      className={cn(
        isDev && '__WelcomeVisualBlock', // DEBUG
        className,
        // 'm-4',
        'gap-4',
        'flex flex-1 flex-col',
        'items-stretch',
        'justify-center',
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
      <SmallWelcomeText className="mb-5" />
    </div>
  );
}
