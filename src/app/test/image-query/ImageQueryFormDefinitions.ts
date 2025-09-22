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
  // model: defaultAiClientType, // Model isn't used for image queries, as only GigaChat is supported so far

  /** This message sets the context, personality, and rules for the entire
   * interaction. It's your chance to "program" the AI's behavior before the
   * conversation begins. The system prompt is typically sent only once at the
   * beginning. */
  // systemQueryText: 'Act like a Renaissance artist.',
  systemQueryText:
    'Photorealistic, National Geographic photo, 50mm lens, f/1.8, dramatic lighting, detailed, sharp focus, gritty --no cartoon, drawing, painting, sketch, anime',

  /** This represents inputs from the human (or application). It can be a
   * question, a command, a statement, or any piece of text that requires a
   * response from the AI. Most queries consist of one or more user messages.
   */
  userQueryText:
    'A weary knight in battered plate armor sitting on a mossy stone, resting at sunset. Light drizzle catches the last rays of sun.',
};
