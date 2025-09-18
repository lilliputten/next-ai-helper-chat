import { redirect } from 'next/navigation';

import { constructMetadata } from '@/lib/constructMetadata';
import { getCurrentUser } from '@/lib/session';

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
  const user = await getCurrentUser();
  console.log('[StartBotPageWrapper]', {
    user,
  });

  if (!user) {
    return redirect('/welcome');
  }

  return <StartBotPage />;
}
