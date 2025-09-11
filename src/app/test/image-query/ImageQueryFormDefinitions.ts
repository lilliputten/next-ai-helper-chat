import { useForm } from 'react-hook-form';
import * as z from 'zod';

// import { AiClientTypeEnum, defaultAiClientType } from '@/lib/types/TAiClientType';

export const formSchema = z.object({
  // model: z.nativeEnum(AiClientTypeEnum),
  systemQueryText: z.string(),
  userQueryText: z.string(),
});

export type TFormData = z.infer<typeof formSchema>;

export type TFormType = ReturnType<typeof useForm<TFormData>>;

export const defaultValues: TFormData = {
  // model: defaultAiClientType,
  systemQueryText: 'Act like a Renaissance artist.',
  userQueryText: 'Draw a lime-green-rainbow pony-cat hybrid.',
};
