import React, { Dispatch, SetStateAction } from 'react';

import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { SignInForm, SignInFormHeader, TSignInProvider } from '@/components/forms/SignInForm';
import { isDev } from '@/config';

interface TSignInModalProps {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}

function SignInModal(props: TSignInModalProps) {
  const { showSignInModal, setShowSignInModal } = props;

  const handleSignInDone = React.useCallback(
    (_provider: TSignInProvider) => {
      setTimeout(() => {
        setShowSignInModal(false);
      }, 400);
    },
    [setShowSignInModal],
  );

  return (
    <Modal
      isVisible={showSignInModal}
      toggleModal={setShowSignInModal}
      className={cn(
        isDev && '__SignInModal', // DEBUG
        'text-center',
        'text-theme-foreground',
        'flex flex-1 flex-col justify-around',
        'max-h-[90%] overflow-hidden',
      )}
    >
      <div
        className={cn(
          isDev && '__SignInModal_Inner', // DEBUG
          'flex w-full flex-1 flex-col justify-center',
          'overflow-hidden',
        )}
      >
        <div
          className={cn(
            isDev && '__SignInModal_InnerHeader', // DEBUG
            'flex flex-1 flex-col items-center justify-center',
            'space-y-3 border-b px-4 py-6 pt-8 md:px-16',
            'bg-theme border-theme-400',
          )}
        >
          <SignInFormHeader />
        </div>
        <ScrollArea
          className={cn(
            isDev && '__SignInModal_Scroll', // DEBUG
            'flex flex-1 flex-col items-center justify-center',
          )}
          viewportClassName={cn(
            isDev && '__SignInModal_ScrollViewport', // DEBUG
            'px-4 py-8 md:px-16 [&>div]:!flex [&>div]:flex-col [&>div]:gap-4 [&>div]:flex-1',
          )}
        >
          <SignInForm onSignInDone={handleSignInDone} />
        </ScrollArea>
      </div>
    </Modal>
  );
}

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = React.useState(false);

  const SignInModalCallback = React.useCallback(() => {
    return (
      <SignInModal showSignInModal={showSignInModal} setShowSignInModal={setShowSignInModal} />
    );
  }, [showSignInModal, setShowSignInModal]);

  return React.useMemo(
    () => ({
      showSignInModal,
      setShowSignInModal,
      SignInModal: SignInModalCallback,
    }),
    [showSignInModal, setShowSignInModal, SignInModalCallback],
  );
}
