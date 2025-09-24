import * as React from 'react';

import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & { type?: React.HTMLInputTypeAttribute; className?: string }
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'border-input',
        'ring-offset-background',
        'placeholder:text-muted-foreground',
        'focus-visible:ring-ring',
        'flex',
        'h-10',
        'w-full',
        'rounded-md',
        'border',
        'bg-transparent',
        'px-3',
        'py-2',
        'text-base',
        'file:border-0',
        'file:bg-transparent',
        'file:text-sm',
        'file:font-medium',
        'transition',
        'hover:ring-primary-500/50 hover:ring-2',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-primary-500',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
        'md:text-sm',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
