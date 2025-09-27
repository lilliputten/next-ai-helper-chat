'use client';

import React from 'react';

import { TReactNode } from '@/lib/types/react';

import { ConfirmForm, TConfirmFormProps } from './ConfirmForm';
import { ModalWrapper } from './ModalWrapper';

interface TConfirmModalProps
  extends Pick<
    TConfirmFormProps,
    | 'confirmButtonVariant'
    | 'confirmButtonText'
    | 'confirmButtonBusyText'
    | 'cancelButtonText'
    | 'confirmButtonIcon'
  > {
  children?: TReactNode;
  dialogDescription?: TReactNode;
  dialogTitle: TReactNode;
  handleClose?: () => void;
  handleConfirm: () => unknown;
  isPending?: boolean;
  isVisible: boolean;
}

export function ConfirmModal(props: TConfirmModalProps) {
  const {
    children,
    dialogDescription,
    dialogTitle,
    handleClose,
    handleConfirm,
    isPending,
    isVisible,
    confirmButtonVariant,
    confirmButtonText,
    confirmButtonBusyText,
    confirmButtonIcon,
    cancelButtonText,
  } = props;
  return (
    <ModalWrapper
      dialogDescription={dialogDescription}
      dialogTitle={dialogTitle}
      handleClose={handleClose}
      isPending={isPending}
      isVisible={isVisible}
    >
      <ConfirmForm
        handleConfirm={handleConfirm}
        className="p-8"
        handleClose={handleClose}
        isPending={isPending}
        confirmButtonVariant={confirmButtonVariant}
        confirmButtonText={confirmButtonText}
        confirmButtonBusyText={confirmButtonBusyText}
        confirmButtonIcon={confirmButtonIcon}
        cancelButtonText={cancelButtonText}
      >
        {children}
      </ConfirmForm>
    </ModalWrapper>
  );
}
