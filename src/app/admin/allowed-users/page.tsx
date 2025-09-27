import { redirect } from 'next/navigation';

import { welcomeRoute } from '@/config/routesConfig';
import { constructMetadata } from '@/lib/constructMetadata';
import { getSessionUser } from '@/lib/session';
import { cn } from '@/lib/utils';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { isDev } from '@/config';

import { AllowedUsersPage } from './AllowedUsersPage';

export async function generateMetadata(/* { params }: TAwaitedLocaleProps */) {
  return constructMetadata({
    title: 'Admin: Allowed Users',
  });
}

export default async function AllowedUsersPageWrapper() {
  const user = await getSessionUser(/* { include: { accounts: true } } */);
  // const isAdmin = user?.role === UserRoles.ADMIN;

  if (!user) {
    return redirect(welcomeRoute);
  }

  return (
    <PageWrapper
      id="AllowedUsersPageWrapper"
      className={cn(
        isDev && '__AllowedUsersPageWrapper', // DEBUG
      )}
      innerClassName={cn(
        isDev && '__AllowedUsersPageWrapper_Inner', // DEBUG
      )}
      // padded
    >
      <AllowedUsersPage />
    </PageWrapper>
  );
}
