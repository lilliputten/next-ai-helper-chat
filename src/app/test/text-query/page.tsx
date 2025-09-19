import { redirect } from 'next/navigation';

import { welcomeRoute } from '@/config/routesConfig';
import { constructMetadata } from '@/lib/constructMetadata';
import { getSessionUser } from '@/lib/session';
import { cn } from '@/lib/utils';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { isDev } from '@/config';

import { TextQueryForm } from './TextQueryForm';

export async function generateMetadata(/* { params }: TAwaitedLocaleProps */) {
  // const { locale } = await params;
  // const locale = defaultLanguage;
  return constructMetadata({
    title: 'Test Query',
    // locale,
  });
}

export default async function TestQueryPage() {
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
      // layoutType="scrollable"
      padded
      // scrollable
      // limitWidth
    >
      <TextQueryForm />
    </PageWrapper>
  );
}
