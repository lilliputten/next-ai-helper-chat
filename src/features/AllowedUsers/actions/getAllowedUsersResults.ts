'use server';

import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/db';
import { DatabaseError } from '@/lib/errors';
import { getErrorText } from '@/lib/helpers';
import { TGetAllowedUsersResults } from '@/lib/zod-schemas';

export async function getAllowedUsersResults(args: Prisma.AllowedUsersFindManyArgs = {}) {
  try {
    const where = args.where || {};
    const [items, totalCount] = await prisma.$transaction([
      prisma.allowedUsers.findMany(args),
      prisma.allowedUsers.count({ where }),
    ]);
    return { items, totalCount } satisfies TGetAllowedUsersResults;
  } catch (error) {
    const nextMessage = ['Allowed users results fetching error', getErrorText(error)]
      .filter(Boolean)
      .join(': ');
    const nextError = new DatabaseError(nextMessage);
    // eslint-disable-next-line no-console
    console.warn('[getAllowedUsersResults]', nextMessage, {
      nextError,
      error,
    });
    debugger; // eslint-disable-line no-debugger
    // NOTE: Re-throw an error?
    throw nextError;
  }
}
