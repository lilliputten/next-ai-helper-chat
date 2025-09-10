import { redirect } from 'next/navigation';

export default function IndexPage() {
  redirect('/test/query');
  /* // DEBUG: Demo content
   * return (
   *   <div
   *     className={cn(
   *       isDev && '__IndexPage', // DEBUG
   *       'test-page',
   *     )}
   *   >
   *     <h1 className="text text-3xl">
   *       {[> Test content <]}
   *       Hello world!
   *     </h1>
   *   </div>
   * );
   */
}
