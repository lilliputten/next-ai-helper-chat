import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const emailSignInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type TEmailSignInData = z.infer<typeof emailSignInSchema>;

export type TEmailSignInFormType = ReturnType<typeof useForm<TEmailSignInData>>;

export const defaultValues: TEmailSignInData = {
  email: '',
};
