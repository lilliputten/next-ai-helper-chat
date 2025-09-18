import { constructMetadata } from '@/lib/constructMetadata';
import { getSessionUser } from '@/lib/session';
import { cn } from '@/lib/utils';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { WelcomeScreen } from '@/components/screens/WelcomeScreen';
import { isDev } from '@/config';

// type TWelcomePageProps = TAwaitedLocaleProps;

export async function generateMetadata(/* { params }: TAwaitedLocaleProps */) {
  // const { locale } = await params;
  // const t = await getTranslations({ locale, namespace: 'WelcomePage' });
  return constructMetadata({
    title: 'Welcome', // t('title'),
    // locale,
  });
}

export async function WelcomePage(/* { params }: TWelcomePageProps */) {
  // const { locale } = await params;

  const user = await getSessionUser();
  const userId = user?.id;
  // Check also if the user really exists in the database>
  const isLoggedUser = !!userId;

  // Enable static rendering
  // setRequestLocale(locale);

  return (
    <PageWrapper
      id="WelcomePage"
      className={cn(
        isDev && '__WelcomePage', // DEBUG
        // 'border-1',
        // 'min-h-full min-w-full',
      )}
      innerClassName={cn(
        isDev && '__WelcomePage_Inner', // DEBUG
        'w-full h-full',
      )}
      // layoutType="scrollable"
      // padded
      // scrollable
      // limitWidth
    >
      {/*
      <UseScrollableLayout type="clippable" />
      */}
      <WelcomeScreen
        className={cn(
          isDev && '__WelcomePage_WelcomeScreen', // DEBUG
        )}
        isLoggedUser={isLoggedUser}
      />
    </PageWrapper>
  );
}
