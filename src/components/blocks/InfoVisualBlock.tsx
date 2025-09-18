import Image from 'next/image';

import { TPropsWithClassName } from '@/lib/types/react';
import { cn } from '@/lib/utils';
import { isDev } from '@/config';

import svgArt from '/public/static/arts/data-blue.svg';

export function InfoVisualBlock(props: TPropsWithClassName) {
  const { className } = props;
  return (
    <div
      className={cn(
        isDev && '__InfoVisualBlock', // DEBUG
        className,
        // 'm-4',
        'gap-4',
        'flex flex-col',
        'items-stretch',
        'justify-center',
      )}
    >
      <Image
        // priority
        src={svgArt}
        alt="Data illustration"
        className={cn(
          isDev && '__InfoVisualBlock_Art', // DEBUG
          'mx-auto mt-4',
          'sm:max-w-lg',
        )}
      />
      {/*
      <div
        className={cn(
          isDev && '__InfoVisualBlock:Art', // DEBUG
          className,
          'flex flex-col',
          'items-center',
          'justify-center',
          'bg-contain',
          'bg-center',
          'bg-no-repeat',
          // 'min-h-40',
        )}
        style={{
          minHeight: '30vh',
          backgroundImage: 'url(/static/arts/data-blue.svg)',
        }}
      />
      <div
        className={cn(
          isDev && '__InfoVisualBlock:Content', // DEBUG
          className,
          'flex flex-col',
          'items-center',
          'justify-center',
        )}
      >
        Info Info Block
      </div>
      */}
    </div>
  );
}
