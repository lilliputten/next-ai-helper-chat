'use client';

import React from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

// import { Drawer } from 'vaul';

import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/Dialog';
import { isDev } from '@/config';

// import { isDev } from '@/constants';
// import { useMediaQuery } from '@/hooks';

interface ModalProps {
  children: React.ReactNode;
  className?: string;
  isVisible?: boolean;
  // NOTE: It's possible to use any of these forms: toggleModal or hideModal (it will only close action from inside the modal component)
  hideModal?: () => void;
  toggleModal?: React.Dispatch<React.SetStateAction<boolean>>;
  // toggleModal?: (v: boolean) => void; // toggleModal?: Dispatch<SetStateAction<boolean>>;
  // desktopOnly?: boolean;
  preventDefaultClose?: boolean;
  title?: string;
  hiddenTitle?: boolean;
  description?: string;
}

export function Modal({
  children,
  className,
  isVisible,
  toggleModal,
  hideModal,
  // desktopOnly,
  preventDefaultClose,
  title,
  hiddenTitle,
  description,
}: ModalProps) {
  const closeModal = ({ dragged }: { dragged?: boolean } = {}) => {
    if (preventDefaultClose && !dragged) {
      return;
    }
    // fire hideModal event if provided
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    hideModal && hideModal();

    // if toggleModal is defined, use it to close modal
    if (toggleModal) {
      toggleModal(false);
    }
  };

  const titleNode = <DialogTitle>{title}</DialogTitle>;
  const showTitle = !hiddenTitle && !!title;
  const descriptionNode = <DialogDescription>{description}</DialogDescription>;

  return (
    <Dialog
      open={hideModal || toggleModal ? isVisible : true}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
    >
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        className={cn(
          isDev && '__DialogContent',
          'overflow-hidden p-0 md:max-w-md',
          'max-sm::w-full max-sm:h-full max-sm:max-w-screen',
          className,
        )}
      >
        {showTitle && titleNode}
        <VisuallyHidden>
          {!showTitle && titleNode}
          {descriptionNode}
        </VisuallyHidden>
        {children}
      </DialogContent>
    </Dialog>
  );
}
