import { NextRequest } from 'next/server';

import { ServerError } from '@/lib/errors';
import { getErrorText } from '@/lib/helpers';
import { verifyTelegramToken } from '@/auth/telegram/telegram-provider';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const identifier = searchParams.get('id');
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  let user: Awaited<ReturnType<typeof verifyTelegramToken>>;

  // Check parameters...
  try {
    if (!token || !identifier) {
      throw new ServerError('Missing token or identifier', 400);
    }
    // Verify the token
    user = await verifyTelegramToken({ token, identifier });
    if (!user) {
      throw new ServerError('Invalid or expired token', 401);
    }
  } catch (error) {
    const status = error instanceof ServerError ? error.statusCode : 500;
    const errMsg = ['Wrong authentication parameters', getErrorText(error)]
      .filter(Boolean)
      .join(': ');
    // eslint-disable-next-line no-console
    console.error('[src/app/api/auth/callback/telegram/route.ts]', errMsg, {
      searchParams,
      token,
      identifier,
      callbackUrl,
      error,
      status,
    });
    // eslint-disable-next-line no-debugger
    debugger;
    // Error: step 1
    return new Response(errMsg, { status });
  }

  // Create a redirect url...
  try {
    // Redirect to next-auth signin with credentials
    const signInUrl = new URL('/api/auth/signin/telegram', request.url);

    signInUrl.searchParams.set('token', token);
    signInUrl.searchParams.set('identifier', identifier);
    signInUrl.searchParams.set('callbackUrl', callbackUrl);

    console.log('[src/app/api/auth/callback/telegram/route.ts]', {
      signInUrl: signInUrl.toString(),
      searchParams,
      token,
      identifier,
      callbackUrl,
    });
    debugger;

    return Response.redirect(signInUrl);
  } catch (error) {
    const status = error instanceof ServerError ? error.statusCode : 500;
    const errMsg = ['Authentication failed', getErrorText(error)].filter(Boolean).join(': ');
    // eslint-disable-next-line no-console
    console.error('[src/app/api/auth/callback/telegram/route.ts]', errMsg, {
      user,
      searchParams,
      token,
      identifier,
      callbackUrl,
      error,
      status,
    });
    // eslint-disable-next-line no-debugger
    debugger;
    return new Response(errMsg, { status });
  }
}
