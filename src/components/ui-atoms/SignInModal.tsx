import React, { Dispatch, SetStateAction } from 'react';

import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { SignInForm, SignInFormHeader, TSignInProvider } from '@/components/forms/SignInForm';
import { isDev } from '@/config';

interface TSignInModalProps {
  showSignInModal: boolean;
  // setShowSignInModal: (v: boolean) => void; // Dispatch<SetStateAction<boolean>>;
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
        // prettier-ignore
        isDev && '__SignInModal',
        'text-center',
        'text-theme-foreground',
        'flex flex-1 flex-col justify-around',
      )}
    >
      <div className="bg-theme flex w-full flex-1 flex-col justify-center">
        <div
          className={cn(
            // prettier-ignore
            'flex flex-col items-center justify-center flex-1',
            'space-y-3',
            'bg-theme',
            'border-b',
            'border-theme-400',
            'px-4',
            'py-6',
            'pt-8',
            'md:px-16',
          )}
        >
          <SignInFormHeader />
        </div>
        <div
          className={cn(
            // prettier-ignore
            'flex flex-col items-center justify-center flex-1',
            'space-y-4',
            'bg-theme-400/70',
            'px-4',
            'py-8',
            'md:px-16',
          )}
        >
          <SignInForm onSignInDone={handleSignInDone} />
        </div>
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
