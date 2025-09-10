import { constructMetadata } from '@/lib/constructMetadata';
import { cn } from '@/lib/utils';
import { isDev } from '@/config';

export async function generateMetadata(/* { params }: TAwaitedLocaleProps */) {
  // const { locale } = await params;
  // const locale = defaultLanguage;
  return constructMetadata({
    title: 'Empty Index Page',
    // locale,
  });
}
export default function IndexPage() {
  return (
    <div
      className={cn(
        isDev && '__IndexPage', // DEBUG
        'test-page',
      )}
    >
      <h1 className="text text-3xl">
        {/* Test content */}
        Hello world!
      </h1>
    </div>
  );
}
