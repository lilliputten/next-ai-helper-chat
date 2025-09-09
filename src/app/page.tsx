import { cn } from '@/lib/utils';
import { isDev } from '@/config';

export default function IndexPage() {
  return (
    <div
      className={cn(
        isDev && '__IndexPage', // DEBUG
        'test-page',
      )}
    >
      <h1 className="text text-3xl">
        {/* Test content */}
        Hello world!
      </h1>
    </div>
  );
}
