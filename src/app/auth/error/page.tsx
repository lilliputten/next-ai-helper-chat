'use client';

import { useSearchParams } from 'next/navigation';

import { getErrorText } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { PageError } from '@/components/shared/PageError';
import { isDev } from '@/config';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title') || 'Authentication Error';
  const message = searchParams.get('message') || 'An authentication error occurred.';

  return (
    <PageError
      className={cn(
        isDev && '__AuthErrorPage', // DEBUG
      )}
      title={title}
      error={message}
    />
  );
}
