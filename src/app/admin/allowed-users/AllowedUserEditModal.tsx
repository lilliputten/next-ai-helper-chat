'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { useAllowedUsers } from '@/hooks/react-query/useAllowedUsers';
import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Add, Edit, FlaskConical, MenuVertical } from '@/components/shared/Icons';
import { ConfirmModal } from '@/components/ui-atoms';
import { ModalWrapper } from '@/components/ui-atoms/ModalWrapper';
import { isDev } from '@/config';
import { TAllowedUser } from '@/features/allowed-users/types';

interface TProps {
  initialAllowedUser?: TAllowedUser;
  handleConfirm: (user: TAllowedUser) => void;
  handleClose?: () => void;
}

export function AllowedUserEditModal(props: TProps) {
  const { initialAllowedUser, handleConfirm, handleClose } = props;
  const [isModalVisible, setModalVisible] = React.useState(true);

  return (
    <ModalWrapper
      className={cn(
        isDev && '__AllowedUserEditModal', // DEBUG
      )}
      dialogTitle={initialAllowedUser ? 'Edit user' : 'Add new user'}
      // confirmButtonVariant="destructive"
      // confirmButtonText="Delete"
      // confirmButtonBusyText="Deleting"
      // cancelButtonText="Cancel"
      handleClose={() => {
        setModalVisible(false);
        if (handleClose) {
          handleClose();
        }
      }}
      // handleConfirm={() => {
      //   setModalVisible(false);
      // }}
      // isPending={isLoadingOverall}
      isVisible={isModalVisible}

      // dialogDescription={dialogDescription}
      // dialogTitle={dialogTitle}
      // handleClose={handleClose}
      // isPending={isPending}
      // isVisible={isVisible}
    >
      <p>FORM</p>
    </ModalWrapper>
  );
}
