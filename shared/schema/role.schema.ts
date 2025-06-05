import { z } from "zod";
import { StringRoleNameSchema } from "./fields/stringRoleName.schema";

export const UserRoleSchema = z.object({
  roleId: z.number(),
  roleName: StringRoleNameSchema,
});

export type UserRoleType = z.infer<typeof UserRoleSchema>;

