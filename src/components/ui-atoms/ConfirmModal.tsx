'use client';

import React from 'react';

import { TReactNode } from '@/lib/types/react';
// import { TReactNode } from '@/shared/types/generic';
import { cn } from '@/lib/utils';
import { DialogDescription, DialogTitle } from '@/components/ui/Dialog';
import { Modal } from '@/components/ui/Modal';
import { isDev } from '@/config';

import { ConfirmForm, TConfirmFormProps } from './ConfirmForm';

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
  // const { isMobile } = useMediaQuery();

  return (
    <Modal
      isVisible={isVisible}
      hideModal={handleClose}
      className={cn(
        isDev && '__ConfirmModal', // DEBUG
        'gap-0',
        isPending && '[&>*]:pointer-events-none [&>*]:opacity-50',
        'flex flex-col',
      )}
    >
      <div
        className={cn(
          isDev && '__ConfirmModal_Header', // DEBUG
          // !isMobile && 'max-h-[90vh]',
          'bg-theme-500 text-theme-foreground flex flex-col px-8 py-4',
          'border-b',
        )}
      >
        <DialogTitle className="DialogTitle">{dialogTitle}</DialogTitle>
        <DialogDescription aria-hidden="true" hidden>
          {dialogDescription}
        </DialogDescription>
      </div>
      <div className="flex flex-1 flex-col px-8 py-4">
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
      </div>
    </Modal>
  );
}
