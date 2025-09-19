import { redirect } from 'next/navigation';

import { welcomeRoute } from '@/config/routesConfig';
import { constructMetadata } from '@/lib/constructMetadata';
import { getSessionUser } from '@/lib/session';
import { cn } from '@/lib/utils';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { isDev } from '@/config';

import { ImageQueryForm } from './ImageQueryForm';

export async function generateMetadata(/* { params }: TAwaitedLocaleProps */) {
  return constructMetadata({
    title: 'Test Image Query',
  });
}

export default async function ImageQueryPage() {
  const user = await getSessionUser({ include: { accounts: true } });
  // const isAdmin = user?.role === UserRoles.ADMIN;

  if (!user) {
    return redirect(welcomeRoute);
  }

  return (
    <PageWrapper
      id="ImageQueryPage"
      className={cn(
        isDev && '__ImageQueryPage', // DEBUG
      )}
      innerClassName={cn(
        isDev && '__ImageQueryPage_Inner', // DEBUG
      )}
      padded
    >
      <ImageQueryForm />
    </PageWrapper>
  );
}
