import { AuthConfig } from '@auth/core';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

import { authErrorRoute, welcomeRoute } from '@/config/routesConfig';
import { prisma } from '@/lib/db';
import { isDev } from '@/config';
import { getAllAllowedEmails } from '@/features/AllowedUsers/actions/getAllAllowedEmails';
import { getUserById } from '@/features/users/actions/';
import { TExtendedUser } from '@/features/users/types/TUser';

import authConfig from './auth.config.server';
import { sessionMaxAge, sessionUpdateAge } from './constants';

const invalidEmailRoute = '/demo-info';

export type TInvalidEmailReason = 'NO_EMAIL' | 'UNKNOWN_EMAIL';

/* // UNUSED: Workaround for make sure that `auth.config.server` is used only on server.
 * // Use different imports for server and client
 * import authConfig from './auth.config';
 * // This is a dynamic import that only runs on the server
 * // It's not included in the client bundle
 * let serverConfig = authConfig;
 * if (typeof window === 'undefined') {
 *   // We're on the server
 *   // eslint-disable-next-line @typescript-eslint/no-require-imports
 *   serverConfig = require('./auth.config.server').default;
 * }
 */

export const nextAuthApp = NextAuth({
  debug: isDev,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: sessionMaxAge,
    updateAge: sessionUpdateAge,
  },
  pages: {
    // @see https://next-auth.js.org/configuration/pages
    signIn: welcomeRoute, // <-- /api/auth/signin
    error: authErrorRoute, // <-- /api/auth/error
    // signOut: '/auth/signout',
  },
  callbacks: {
    async signIn(params) {
      const validEmails = await getAllAllowedEmails();
      const {
        user,
        account,
        profile,
        // email: verificationEmail, // { verificationRequest?: boolean }
        credentials,
      } = params;
      const { provider, type, providerAccountId } = account || {};
      const userEmail = user.email;
      const profileEmail = profile?.email;
      const email = userEmail || profileEmail;
      let rejectReason: TInvalidEmailReason | undefined;

      // Skip email validation for telegram provider
      if (provider === 'telegram') {
        return true;
      }

      if (!email) {
        rejectReason = 'NO_EMAIL';
      } else if (!validEmails.includes(email)) {
        rejectReason = 'UNKNOWN_EMAIL';
      }
      if (rejectReason) {
        // eslint-disable-next-line no-console
        console.warn('[auth:callbacks:signIn] Sing in rejected:', {
          rejectReason,
          email,
          userEmail,
          profileEmail,
          provider,
          type,
          providerAccountId,
          user,
          account,
          profile,
          credentials,
        });
        // debugger; // eslint-disable-line no-debugger
        if (provider === 'nodemailer' && type === 'email') {
          throw rejectReason;
        }
        return `${invalidEmailRoute}?reason=${rejectReason}`;
      }
      /* console.log('[auth:callbacks:signIn] success', {
       *   email,
       *   profileEmail,
       *   provider,
       *   type,
       *   providerAccountId,
       *   user,
       *   account,
       *   profile,
       *   credentials,
       * });
       */
      return true;
    },
    async session(params) {
      const { token, session } = params;
      /* console.log('[auth:callbacks:session]', {
       *   token,
       *   session,
       *   params,
       * });
       */
      const user = session.user as unknown as TExtendedUser;
      if (user) {
        if (token.sub) {
          user.id = token.sub;
          // It uses tg user id for telegram login
        }
        if (token.email) {
          user.email = token.email;
        }
        if (token.role) {
          // @see JWT type extension in `@types/next-auth.d.ts`
          user.role = token.role as UserRole;
        }
        user.name = token.name || null;
        user.image = token.picture || null;
      }
      return session;
    },
    async jwt(params) {
      const token = params.token as JWT;
      // const { token } = params;
      /* // Values for telegram login:
       * {
       *   "token": {
       *     "name": "Ig ",
       *     "email": "490398083",
       *     "picture": "https://t.me/i/userpic/320/3meBKT_rsGqbt3HOAqNHdAIWEQYHGeW3m86yeYhZiUo.jpg",
       *     "sub": "490398083"
       *   },
       *   "user": {
       *     "id": "490398083",
       *     "email": "490398083",
       *     "name": "Ig ",
       *     "image": "https://t.me/i/userpic/320/3meBKT_rsGqbt3HOAqNHdAIWEQYHGeW3m86yeYhZiUo.jpg"
       *   },
       *   "account": {
       *     "providerAccountId": "490398083",
       *     "type": "credentials",
       *     "provider": "telegram-auth"
       *   },
       *   "isNewUser": false,
       *   "trigger": "signIn"
       * }
       */
      if (!token.sub) {
        return token;
      }
      const dbUser = await getUserById(token.sub);
      if (!dbUser) {
        return token;
      }
      token.name = dbUser.name;
      token.email = dbUser.email;
      token.picture = dbUser.image;
      token.role = dbUser.role as UserRole;
      return token;
    },
  } satisfies AuthConfig['callbacks'],
  // Use the server config if we're on the server, otherwise use the client-safe config
  ...authConfig,
});

export const {
  handlers: { GET, POST },
  auth,
} = nextAuthApp;
