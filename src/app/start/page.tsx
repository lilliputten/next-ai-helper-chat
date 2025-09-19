import { redirect } from 'next/navigation';

import { welcomeRoute } from '@/config/routesConfig';
import { constructMetadata } from '@/lib/constructMetadata';
import { getSessionUser } from '@/lib/session';
import { cn } from '@/lib/utils';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { isDev } from '@/config';

import { StartBotPage } from './StartBotPage';

export async function generateMetadata(/* { params }: TAwaitedLocaleProps */) {
  return constructMetadata({
    title: 'Start Bot',
  });
}

export default async function StartBotPageWrapper() {
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
      <StartBotPage />
    </PageWrapper>
  );
}
