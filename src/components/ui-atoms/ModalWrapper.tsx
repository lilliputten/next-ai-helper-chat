'use client';

import React from 'react';

import { TReactNode } from '@/lib/types/react';
import { cn } from '@/lib/utils';
import { DialogDescription, DialogTitle } from '@/components/ui/Dialog';
import { Modal } from '@/components/ui/Modal';
import { isDev } from '@/config';

interface TModalWrapperProps {
  className?: string;
  children?: TReactNode;
  dialogDescription?: TReactNode;
  dialogTitle: TReactNode;
  handleClose?: () => void;
  isPending?: boolean;
  isVisible: boolean;
}

export function ModalWrapper(props: TModalWrapperProps) {
  const { className, children, dialogDescription, dialogTitle, handleClose, isPending, isVisible } =
    props;

  return (
    <Modal
      isVisible={isVisible}
      hideModal={handleClose}
      className={cn(
        isDev && '__ModalWrapper', // DEBUG
        'gap-0',
        isPending && '[&>*]:pointer-events-none [&>*]:opacity-50',
        'flex flex-col',
        className,
      )}
    >
      <div
        className={cn(
          isDev && '__ModalWrapper_Header', // DEBUG
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
      <div className="flex flex-1 flex-col px-8 py-4">{children}</div>
    </Modal>
  );
}
