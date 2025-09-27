'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { ErrorLike } from '@/lib/errors';
import { getErrorText, ucFirst } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Check, Close, Spinner } from '@/components/shared/Icons';
import { ModalWrapper } from '@/components/ui-atoms/ModalWrapper';
import { isDev } from '@/config';
import {
  AllowedUserTypes,
  allowedUserTypesList,
  coercedNewOrExistedAllowedUserSchema,
  TAllowedUser,
} from '@/features/allowed-users/types';

const formSchema = coercedNewOrExistedAllowedUserSchema;

type TFormData = z.infer<typeof formSchema>;

type TFormType = ReturnType<typeof useForm<TFormData>>;

const typesList = allowedUserTypesList.map((id) => ({ id, name: ucFirst(id.toLowerCase()) }));

const defaultFormValues: TFormData = {
  type: AllowedUserTypes.email,
  value: '',
};

interface TProps {
  initialAllowedUser?: TAllowedUser;
  handleConfirm: (user: TFormData) => Promise<unknown>;
  handleClose?: () => void;
  error?: ErrorLike;
}

export function AllowedUserEditModal(props: TProps) {
  const { initialAllowedUser, handleConfirm, handleClose, error } = props;
  const [isModalVisible, setModalVisible] = React.useState(true);
  const [isSaving, setSaving] = React.useState(false);

  const defaultValues = initialAllowedUser ? (initialAllowedUser as TFormData) : defaultFormValues;

  const form: TFormType = useForm<TFormData>({
    mode: 'onChange',
    criteriaMode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
    // @see https://react-hook-form.com/docs/useform
    formState, // FormState<TFormData>;
    handleSubmit, // UseFormHandleSubmit<TFormData, TTransformedValues>;
    register, // UseFormRegister<TFormData>;
    watch,
    // reset,
  } = form;

  const {
    // @see https://react-hook-form.com/docs/useform/formstate
    isDirty, // boolean;
    errors, // FieldErrors<TFormData>;
    isValid, // boolean;
  } = formState;

  const isSubmitEnabled = /* !isPending && */ isDirty && isValid;

  const onSubmit = handleSubmit((formData) => {
    setSaving(true);
    /* console.log('[AllowedUserEditModal:onSubmit]', {
     *   formData,
     * });
     */
    handleConfirm(formData).finally(() => setSaving(false));
  });

  const closeModal = () => {
    setModalVisible(false);
    if (handleClose) {
      handleClose();
    }
  };

  const typeKey = React.useId();
  const valueKey = React.useId();
  const registerSelectField = register('type', { required: true });

  const ShowSaveIcon = isSaving ? Spinner : Check;

  return (
    <ModalWrapper
      className={cn(
        isDev && '__AllowedUserEditModal', // DEBUG
      )}
      isPending={isSaving}
      dialogTitle={initialAllowedUser ? 'Edit user' : 'Add new user'}
      handleClose={closeModal}
      isVisible={isModalVisible}
    >
      <form
        onSubmit={onSubmit}
        className={cn(
          isDev && '__AllowedUserEditModal', // DEBUG
          'mx-auto flex w-full max-w-xl flex-1 flex-col gap-4 py-4',
        )}
      >
        {!!error && <p className="text-sm text-red-500">{getErrorText(error)}</p>}

        <div
          className={cn('flex w-full flex-col gap-4', isSaving && 'pointer-events-none opacity-50')}
        >
          <div className="flex w-full flex-col gap-4">
            <Label className="-sr-only" htmlFor={typeKey}>
              Select user type
            </Label>
            <Select
              {...registerSelectField}
              value={watch('type')}
              onValueChange={(value) =>
                registerSelectField.onChange({ target: { name: 'type', value } })
              }
            >
              <SelectTrigger className="min-h-[3.em] flex-1" aria-label="Language" id={typeKey}>
                <SelectValue placeholder="Select a user type…" />
              </SelectTrigger>
              <SelectContent>
                {typesList.map(({ id, name }) => (
                  <SelectItem value={id} key={id} className="hover:bg-primary-500 text-white">
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* errors?.id && <p className="pb-0.5 text-[13px] text-red-500">{errors.id.message}</p> */}
            <p className="text-muted-foreground text-sm opacity-50">Select a type form the list.</p>
          </div>
          <div className="flex w-full flex-col gap-4">
            <Label className="-sr-only" htmlFor={valueKey}>
              Enter proper user ID or e-mail
            </Label>
            <Input
              id={valueKey}
              placeholder="E-mail or ID"
              {...register('value', { required: true })}
            />
            {errors?.value && <p className="pb-0.5 text-sm text-red-500">{errors.value.message}</p>}
            <p className="text-muted-foreground text-sm opacity-50">Enter proper ID or e-mail.</p>
          </div>
        </div>
        <div className="flex w-full gap-4">
          <Button
            type="submit"
            variant={isSubmitEnabled ? 'default' : 'disable'}
            disabled={!isSubmitEnabled}
            className={cn('flex gap-2', isSaving && 'pointer-events-none opacity-50')}
          >
            <ShowSaveIcon className={cn('size-4 opacity-50', isSaving && 'animate-spin')} />
            <span>Save</span>
          </Button>
          <Button type="button" variant="ghost" className="flex gap-2" onClick={closeModal}>
            <Close className="size-4 opacity-50" />
            <span>Cancel</span>
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
