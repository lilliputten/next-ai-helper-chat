import { redirect } from 'next/navigation';

import { startRoute, welcomeRoute } from '@/config/routesConfig';
import { getSessionUser } from '@/lib/session';

export default async function IndexPage() {
  const user = await getSessionUser();
  // const isAdmin = user?.role === UserRoles.ADMIN;

  if (!user) {
    return redirect(welcomeRoute);
  }

  redirect(startRoute);
}
