'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { getErrorText } from '@/lib/helpers';
import { TPropsWithClassName } from '@/lib/types/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Spinner } from '@/components/shared/Icons';
import { isDev } from '@/config';

export const tokenSignInSchema = z.object({
  token: z.string().min(1),
});

export type TTelegramSignInData = z.infer<typeof tokenSignInSchema>;

export type TTelegramSignInFormType = ReturnType<typeof useForm<TTelegramSignInData>>;

export const defaultValues: TTelegramSignInData = {
  token: '',
};

export function TelegramSignInForm({ className }: TPropsWithClassName) {
  const [isSubmitting, startSubmitting] = React.useTransition();
  const [message, setMessage] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const form = useForm<TTelegramSignInData>({
    mode: 'onChange',
    resolver: zodResolver(tokenSignInSchema),
    defaultValues,
  });

  const { register, handleSubmit, formState } = form;
  const { errors, isValid, isReady } = formState;

  const isAllReady = isReady;
  const isSumbitAvailable = isAllReady && isValid && !isSubmitting;
  const SubmitIcon = isSubmitting ? Spinner : ArrowRight;

  const onSubmit = handleSubmit((data) => {
    const { token } = data;
    setError('');
    setMessage('');
    startSubmitting(async () => {
      try {
        console.log('[TelegramSignInForm:onSubmit] start', {
          token,
        });
        debugger;
        throw new Error('Telegram sign-in isnt implemented yet');
        /* // TODO: Signin via telgram provider (TelegramProvider)
         * const result = await signIn('nodtokener', {
         *   token,
         *   redirect: false,
         *   callbackUrl: rootRoute,
         * });
         * if (!result || result?.error) {
         *   throw result?.error;
         * }
         * const msg = 'A login message has been sent. Check your token for a sign-in link.';
         * setMessage(msg);
         * toast.success(msg);
         */
      } catch (error) {
        const errMsg = ['An error occurred, please try again', getErrorText(error)]
          .filter(Boolean)
          .join(': ');
        // eslint-disable-next-line no-console
        console.error('[TelegramSignInForm:onSubmit]', errMsg, {
          token,
          error,
        });
        debugger; // eslint-disable-line no-debugger
        setError(errMsg);
        toast.error(errMsg);
      }
    });
  });

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        isDev && '__TelegramSignInForm', // DEBUG
        'flex flex-col gap-3',
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="token" className="block text-center text-sm font-medium">
          Then follow the link or enter the token here:
        </label>
        <div className="flex">
          <input
            {...register('token')}
            id="token"
            type="token"
            placeholder="Enter generated token"
            className={cn(
              isDev && '__TelegramSignInForm_Input', // DEBUG
              'w-full rounded border px-5 py-2 transition focus:ring-2 focus:outline-none',
              'rounded-full rounded-e-none',
              errors.token
                ? 'border-red-500 focus:ring-red-500'
                : 'focus:ring-primary-500 border-gray-500/20',
            )}
          />
          <Button
            type="submit"
            disabled={!isSumbitAvailable}
            variant="theme"
            rounded="full"
            className={cn(
              isDev && '__TelegramSignInForm_Button', // DEBUG
              'rounded-s-none',
              'flex gap-2',
            )}
          >
            <SubmitIcon className={cn('size-4', isSubmitting && 'animate-spin')} />
            {/*
            <span>Sign in with Token</span>
            */}
          </Button>
        </div>
        {errors.token && <span className="text-sm text-red-500">{errors.token.message}</span>}
      </div>

      {message && !error && <p className={cn('text-center text-sm text-green-500')}>{message}</p>}
      {error && <p className={cn('text-center text-sm text-red-500')}>{error}</p>}
    </form>
  );
}
