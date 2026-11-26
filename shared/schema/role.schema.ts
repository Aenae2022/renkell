import { z } from "zod";
import { StringRoleNameSchema } from "./fields/stringRoleName.schema";
import { EntierPositifSchema } from "./fields/entierPositif.schema";

export const UserRoleSchema = z.object({
  roleId: EntierPositifSchema,
  roleName: StringRoleNameSchema,
});

export type UserRoleType = z.infer<typeof UserRoleSchema>;

