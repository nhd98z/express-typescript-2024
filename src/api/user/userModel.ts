import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

export const zUser = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  age: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type User = z.infer<typeof zUser>;

// Input Validation for 'GET users/:id' endpoint
export const zGetUser = z.object({
  params: z.object({ id: commonValidations.id }),
});
