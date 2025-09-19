'use client';

// import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/DropdownMenu';
import { Moon, Sun } from '@/components/shared/Icons';
import { isDev } from '@/config';

import { NavModeToggleBlock } from './NavModeToggleBlock';
import { TSidebarBlockProps } from './SidebarComponents';

export function NavModeToggle(props: TSidebarBlockProps) {
  const { onPrimary, onSidebar, className } = props;
  const t = (s: string) => s; // useTranslations('NavModeToggle');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild aria-label={t('label')}>
        <Button
          variant={onPrimary || onSidebar ? 'ghostOnTheme' : 'ghost'}
          size="sm"
          className={cn(
            isDev && '__NavModeToggle', // DEBUG
            'relative size-8 px-0',
            // onSidebar && 'flex justify-start gap-2 px-2',
            className,
          )}
          title={t('label')}
        >
          <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">{t('label')}</span>
        </Button>
      </DropdownMenuTrigger>
      <NavModeToggleBlock align="end" onPrimary={onPrimary} onSidebar={onSidebar} />
    </DropdownMenu>
  );
}
