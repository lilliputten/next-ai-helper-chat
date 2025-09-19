import React from 'react';

import { getSessionUser } from '@/lib/session';
import { TPropsWithChildren } from '@/lib/types/react';
import { cn } from '@/lib/utils';
import { isDev } from '@/config';

import { GenericLayoutContent } from './GenericLayoutContent';

export async function GenericLayout(props: TPropsWithChildren) {
  const { children } = props;
  const user = await getSessionUser();
  return (
    <GenericLayoutContent
      {...props}
      user={user}
      className={cn(
        isDev && '__GenericLayout', // DEBUG
      )}
    >
      {children}
    </GenericLayoutContent>
  );
}
