'use client';

import Link from 'next/link';

import { TPropsWithClassName } from '@/lib/types/react';
import { cn } from '@/lib/utils';
import { useSessionUser } from '@/hooks/useSessionUser';
import { isDev } from '@/config';

export function SmallWelcomeText(props: TPropsWithClassName) {
  const { className } = props;
  const user = useSessionUser();
  const isLogged = !!user;
  const isAdmin = user?.role === 'ADMIN';
  return (
    <div
      className={cn(
        isDev && '__IntroText', // DEBUG
        className,
        'gap-4',
        'text-content',
        'text-center', // Only for small texts
      )}
    >
      <h1>Welcome!</h1>
      <p>Content...</p>
      {/*t.rich('content', {
        p: (chunks) => <p>{chunks}</p>,
        infolink: (chunks) => <Link href={infoRoute}>{chunks}</Link>,
      })*/}
      {isLogged ? (
        <p>
          You can edit <Link href={'/'}>your own data</Link>, as you're an authorized user.{' '}
          {isAdmin && (
            <>
              And you can check <Link href={'/'}>all user's data</Link>, as you're an administrator.
            </>
          )}
        </p>
      ) : (
        <p>Some extra text for anonymous users...</p>
      )}
    </div>
  );
}
