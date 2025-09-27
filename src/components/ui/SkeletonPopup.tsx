import { cn } from '@/lib/utils';
import { Spinner } from '@/components/shared/Icons';
import { isDev } from '@/config';

// import { isDev } from '@/constants';

function SkeletonPopup({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        isDev && '__SkeletonPopup_Wrapper', // DEBUG
        'fixed inset-0',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50 bg-black/30 backdrop-blur-sm',
        'flex items-center justify-center',
        className,
      )}
    >
      <Spinner className="size-8 animate-spin" />
    </div>
  );
}

export { SkeletonPopup };
