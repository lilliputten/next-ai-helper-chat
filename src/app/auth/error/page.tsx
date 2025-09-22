'use client';

import { useSearchParams } from 'next/navigation';

import { getErrorText } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { PageError } from '@/components/shared/PageError';
import { isDev } from '@/config';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title') || 'Authentication Error';
  const error = searchParams.get('error') || 'An authentication error occurred.';

  return (
    <PageError
      className={cn(
        isDev && '__AuthErrorPage', // DEBUG
      )}
      title={title}
      error={error}
    />
  );
}
