import * as React from 'react';

import { cn } from '@/lib/utils';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps & { className?: string }>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'border-input',
          'ring-offset-background',
          'placeholder:text-muted-foreground',
          'flex',
          'h-20',
          'w-full',
          'rounded-md',
          'border',
          'bg-transparent',
          'px-3',
          'py-2',
          'text-sm',
          'transition',
          'hover:ring-primary-500/50 hover:ring-2',
          // 'focus-visible:ring-ring',
          'focus-visible:ring-2',
          // 'focus-visible:ring-offset-2',
          'focus-visible:ring-primary-500',
          'focus-visible:outline-none',
          'disabled:cursor-not-allowed',
          'disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
