import { constructMetadata } from '@/lib/constructMetadata';

import { StartBotPage } from './StartBotPage';

export async function generateMetadata(/* { params }: TAwaitedLocaleProps */) {
  // const { locale } = await params;
  // const locale = defaultLanguage;
  return constructMetadata({
    title: 'Start Bot',
    // locale,
  });
}

export default StartBotPage;
