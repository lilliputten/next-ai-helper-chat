import { constructMetadata } from '@/lib/constructMetadata';
import { cn } from '@/lib/utils';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { TInvalidEmailReason } from '@/auth';
import { isDev } from '@/config';

import { DemoInfoScreen } from './DemoInfoScreen';

export async function generateMetadata() {
  return constructMetadata({
    title: 'Demo Info',
  });
}

interface TPageProps {
  searchParams: Promise<{
    reason?: string;
  }>;
}

export default async function DemoInfoPage({ searchParams }: TPageProps) {
  const resolvedSearchParams = await searchParams;
  const reason = resolvedSearchParams.reason as TInvalidEmailReason;
  return (
    <PageWrapper
      id="DemoInfoPage"
      className={cn(
        isDev && '__DemoInfoPage', // DEBUG
      )}
      innerClassName={cn(
        isDev && '__DemoInfoPage_Inner', // DEBUG
      )}
    >
      <DemoInfoScreen reason={reason} />
    </PageWrapper>
  );
}
