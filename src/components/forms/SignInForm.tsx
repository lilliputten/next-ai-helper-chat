'use client';

import React from 'react';
import Link from 'next/link';
import { signIn, SignInOptions } from 'next-auth/react';

// import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Github, Google, IconType, Spinner, Yandex } from '@/components/shared/Icons';
import { Logo } from '@/components/shared/Logo';
import { isDev } from '@/config';

type TSignInParameters = Parameters<typeof signIn>;
export type TSignInProvider = TSignInParameters[0];

const t = (t: string) => t;

interface OAuthSignInButtonProps {
  currentProvider?: TSignInProvider;
  onSignInStart?: (provider: TSignInProvider) => void;
  onSignInDone?: (provider: TSignInProvider) => void;
  provider: TSignInProvider;
  ProviderIcon: IconType; // React.FC;
  text: string;
  /** Rendered inside Link body or in the app header */
  inBody?: boolean;
}

function OAuthSignInButton(props: OAuthSignInButtonProps) {
  const {
    // prettier-ignore
    currentProvider,
    onSignInStart,
    onSignInDone,
    provider,
    ProviderIcon,
    text,
    // inBody,
  } = props;
  const isClicked = !!currentProvider;
  const isThisClicked = currentProvider == provider;
  const onSignIn = React.useCallback(() => {
    const options: SignInOptions = { redirectTo: '/start' };
    if (onSignInStart) {
      onSignInStart(provider);
    }
    // @see https://next-auth.js.org/getting-started/client#specifying-Link-callbackurl
    signIn(provider, options).then(() => {
      if (onSignInDone) {
        onSignInDone(provider);
      }
    });
  }, [onSignInStart, onSignInDone, provider]);

  const icon = isThisClicked ? (
    <Spinner className="mr-2 size-4 animate-spin" />
  ) : (
    <ProviderIcon className="mr-2 size-4" />
  );

  return (
    <Button
      className={cn(
        isDev && '__SignInModal-button', // DEBUG
        isDev && '__provider-' + provider,
        'flex gap-1',
      )}
      variant="theme"
      rounded="full"
      disabled={isClicked}
      onClick={() => onSignIn()}
    >
      {icon}
      <span className="truncate">{text}</span>
    </Button>
  );
}

interface TSignInFormHeaderProps {
  dark?: boolean;
}

export function SignInFormHeader(props: TSignInFormHeaderProps) {
  const { dark } = props;
  // const t = useTranslations('SignInForm');
  return (
    <>
      <Link href={'/'}>
        <Logo className="size-32" dark={dark} />
      </Link>
      <h3 className="font-urban text-app-orange text-2xl font-bold">{t('Sign In')}</h3>
      {/*
      <p className="text-center text-sm">{t('intro')}</p>
      */}
    </>
  );
}

interface TSignInFormProps {
  onSignInStart?: (provider: TSignInProvider) => void;
  onSignInDone?: (provider: TSignInProvider) => void;
  /** Rendered inside Link body or in the app header */
  inBody?: boolean;
}

export function SignInForm(props: TSignInFormProps) {
  const { onSignInStart, onSignInDone } = props;
  const [currentProvider, setCurrentProvider] = React.useState<TSignInProvider>(undefined);
  // const t = useTranslations('SignInForm');

  const handleSignInStart = React.useCallback(
    (provider: TSignInProvider) => {
      setCurrentProvider(provider);
      if (onSignInStart) {
        onSignInStart(provider);
      }
    },
    [onSignInStart],
  );

  return (
    <>
      <OAuthSignInButton
        currentProvider={currentProvider}
        onSignInStart={handleSignInStart}
        onSignInDone={onSignInDone}
        provider="github"
        ProviderIcon={Github}
        text={t('sign-in-with-github')}
        // inBody={inBody}
      />
      <OAuthSignInButton
        currentProvider={currentProvider}
        onSignInStart={handleSignInStart}
        onSignInDone={onSignInDone}
        provider="yandex"
        ProviderIcon={Yandex}
        text={t('sign-in-with-yandex')}
        // inBody={inBody}
      />
      <OAuthSignInButton
        currentProvider={currentProvider}
        onSignInStart={handleSignInStart}
        onSignInDone={onSignInDone}
        provider="google"
        ProviderIcon={Google}
        text={t('sign-in-with-google')}
        // inBody={inBody}
      />
      {/* // NOTE: Temporarily don't use telegram login, as it's buggy (see `team-tree-app` project for an example of `telegram-auth` usage)
      <OAuthSignInButton
        currentProvider={currentProvider}
        onSignInStart={handleSignInStart}
        onSignInDone={onSignInDone}
        provider="telegram-auth"
        ProviderIcon={Telegram}
        text={t('sign-in-with-telegram')}
        // inBody={inBody}
      />
      */}
      {/* TODO: Email login section (resend) */}
    </>
  );
}
