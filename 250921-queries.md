> 2025.09.21

Create a custom next-auth provider, like `next-auth/providers/nodemailer`, to authenticate user via external callback URL with a token obtained from an associated telegram bot?

The telegram bot (with a name of `BOT_USERNAME` from server environment) has access to the app database and can create a verification token in a table similar to next-auth's `VerificationToken`.

For example, the nodemailer provider sends email messages with authorization links in form:

`http://{HOST}/api/auth/callback/nodemailer?callbackUrl={ENCODED_REDIRECT_URL}&token={PACKED_TOKEN}&email={EMAIL}`

I need the same but for telegram user.

See for:

- providers definition in the `src/auth/auth.config.server.ts`,
- telegram provider in `src/auth/telegram/telegram-provider.ts`

Add a telegram provider section in the `src/components/forms/SignInForm.tsx` module -- it should contain a link to open the tellegram bot with a name `BOT_USERNAME` (it's provided from a server environment, src/config/envServer.ts`; add a context in the `src/contexts/EnvContext.tsx`to pass some configuration variables to the client, including bot name from`BOT_USERNAME`and connect this context in the`src/app/layout.tsx`).

Add an invocation command to the telegram bot link: `https://t.me/{BOT_USERNAME}?start=/authorize`.

Create an `/authorize` command processor in `src/app/api/bot/authorize.ts` and use it in `src/app/api/bot/route.ts` to process user's aurization requests -- this command should add a verification token in the database and return a link in a form specified above.

It's possible to pass and parse complex commands like `/authorize-{SOME_ID_OR_WHATEVER}` if it's necessary.

Check for passed token and return the created user in the `verifyTelegramToken` funciton (in the `src/auth/telegram/telegram-provider.ts`).

Add necessary changes in the callbacks in `src/auth/auth.ts` module.

Project uses:

- pnpm
- nextjs 15.5.2
- next-auth 5.0.0-beta.29
- grammy: 1.38.2

---

nodemailer link example:

```
http://localhost:3000/api/auth/callback/nodemailer?callbackUrl={ENCODED_REDIRECT_URL}&token={PACKED_TOKEN}&email=lilliputten%40yandex.ru

http://localhost:3000/api/auth/callback/nodemailer?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fstart&token=7c967c0abb0167482e6a2d05bf53b8d9d92bf2c4b0ec32d6893c1fdc3ec9dc26&email=lilliputten%40yandex.ru
```
