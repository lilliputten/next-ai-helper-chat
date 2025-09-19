import { redirect } from 'next/navigation';

import { welcomeRoute } from '@/config/routesConfig';
import { constructMetadata } from '@/lib/constructMetadata';
import { UserRoles } from '@/lib/db';
import { getSessionUser } from '@/lib/session';

import { StartBotPage } from './StartBotPage';

export async function generateMetadata(/* { params }: TAwaitedLocaleProps */) {
  // const { locale } = await params;
  // const locale = defaultLanguage;
  return constructMetadata({
    title: 'Start Bot',
    // locale,
  });
}

export default async function StartBotPageWrapper() {
  const user = await getSessionUser({ include: { accounts: true } });
  const isAdmin = user?.role === UserRoles.ADMIN;
  console.log('[StartBotPageWrapper]', {
    isAdmin,
    user,
  });

  if (!user) {
    return redirect(welcomeRoute);
  }

  return <StartBotPage />;
}
