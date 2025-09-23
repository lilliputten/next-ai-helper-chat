import { z } from 'zod';

import { TGetResults } from '@/lib/types/api';
import { TAllowedUser } from '@/features/AllowedUsers/types';
import { AllowedUsersOrderByWithRelationInputSchema } from '@/generated/prisma';

export const zAllowedUsersOrderBy = z
  .union([
    AllowedUsersOrderByWithRelationInputSchema.array(),
    AllowedUsersOrderByWithRelationInputSchema,
  ])
  .optional();
export type TAllowedUsersOrderBy = z.infer<typeof zAllowedUsersOrderBy>;

export const GetAllowedUsersParamsSchema = z.object({
  type: z.coerce.string().optional(),
  skip: z.coerce.number().int().nonnegative().optional(),
  take: z.coerce.number().int().positive().optional(),
  value: z.coerce.string().optional(),
  /** Sort by parameter, default: `{ updatedAt: 'desc' }`, packed json string */
  // orderBy: AllowedUsersFindManyArgsSchema.shape.orderBy, // This approach doesn't work
  orderBy: zAllowedUsersOrderBy,
});

export type TGetAllowedUsersParams = z.infer<typeof GetAllowedUsersParamsSchema>;

export type TGetAllowedUsersResults = TGetResults<TAllowedUser>;
