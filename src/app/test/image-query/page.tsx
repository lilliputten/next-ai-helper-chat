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
      {/* // DEBUG
      <pre
        className={cn(
          isDev && '__ImageQueryPage_DEBUG', // DEBUG
        )}
      >
        <div>BOT_TOKEN: {BOT_TOKEN}</div>
        <div>BOT_USERNAME: {BOT_USERNAME}</div>
        <div>WEBHOOK_HOST: {WEBHOOK_HOST}</div>
        <div>GIGACHAT_CREDENTIALS: {GIGACHAT_CREDENTIALS}</div>
        <div>GIGACHAT_MODEL: {GIGACHAT_MODEL}</div>
        <div>CLOUDFLARE_ACCOUNT_ID: {CLOUDFLARE_ACCOUNT_ID}</div>
        <div>CLOUDFLARE_API_TOKEN: {CLOUDFLARE_API_TOKEN}</div>
        <div>PUBLIC_URL: {PUBLIC_URL}</div>
        <div>isVercel: {String(isVercel)}</div>
        <div>isVercelPreview: {String(isVercelPreview)}</div>
        <div>isVercelProduction: {String(isVercelProduction)}</div>
        <div>VERCEL_ENV: {VERCEL_ENV}</div>
      </pre>
      */}
      <ImageQueryForm />
    </div>
  );
}
