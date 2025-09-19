import * as React from 'react';

import { cn } from '@/lib/utils';
import { TGenericIcon } from '@/components/shared/Icons';

type ErrorPlaceHolderProps = React.HTMLAttributes<HTMLDivElement>;

export function ErrorPlaceHolder({
  className,
  containerClassName,
  children,
  ...props
}: ErrorPlaceHolderProps & { containerClassName?: string }) {
  return (
    <div
      className={cn(
        'animate-in fade-in-50 flex flex-1 items-center justify-center rounded-lg border border-dashed p-8 text-center shadow-sm',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'flex flex-col items-center gap-6 text-center',
          // 'max-w-[420px]',
          containerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

interface ErrorPlaceHolderIconProps extends Partial<React.SVGProps<SVGSVGElement>> {
  icon: TGenericIcon;
  ref?: ((instance: SVGSVGElement | null) => void) | React.RefObject<SVGSVGElement> | null;
}

ErrorPlaceHolder.Icon = function ErrorPlaceHolderIcon({
  icon,
  className,
  ...props
}: ErrorPlaceHolderIconProps) {
  const Icon = icon;
  if (Icon) {
    return (
      <div className="error-gradient-background flex size-20 items-center justify-center rounded-full text-white">
        <Icon className={cn('size-10', className)} {...props} />
      </div>
    );
  }
};

type ErrorPlaceHolderTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

ErrorPlaceHolder.Title = function ErrorPlaceHolderTitle({
  className,
  ...props
}: ErrorPlaceHolderTitleProps) {
  return <h3 className={cn('font-heading mt-2 text-2xl font-bold', className)} {...props} />;
};

type ErrorPlaceHolderDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

ErrorPlaceHolder.Description = function ErrorPlaceHolderDescription({
  className,
  ...props
}: ErrorPlaceHolderDescriptionProps) {
  return (
    <p
      className={cn(
        'text-muted-foreground mt-1.5 mb-5 text-center text-sm leading-6 font-normal',
        className,
      )}
      {...props}
    />
  );
};
