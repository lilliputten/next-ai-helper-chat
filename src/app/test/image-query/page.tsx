import { constructMetadata } from '@/lib/constructMetadata';
import { cn } from '@/lib/utils';
import { isDev } from '@/config';

import { ImageQueryForm } from './ImageQueryForm';

export async function generateMetadata(/* { params }: TAwaitedLocaleProps */) {
  // const { locale } = await params;
  // const locale = defaultLanguage;
  return constructMetadata({
    title: 'Test Query',
    // locale,
  });
}

export default function TestQueryPage() {
  return (
    <div
      className={cn(
        isDev && '__ImageQueryPage', // DEBUG
      )}
    >
      <ImageQueryForm />
    </div>
  );
}
