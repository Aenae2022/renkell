import { z } from "zod";
import { StringShortRefSchema } from "./fields/stringShortRef.schema";
import { StringNameSchema } from "./fields/stringName.schema";
import { GroupInfoSchema, GroupPrincipalInfoSchema, GroupSecondaireInfoSchema} from "./group.schema";
import { LinkShortSchema } from "./link.schema";
import { BcryptHashSchema } from "./fields/password.schema";
import { TypeUserDatasSchema } from "./typeUser.schema";
import FileNameSchema from "./fields/fileName.schema";
import { GradeSchema } from "./grade.schema";


export const UserPseudoSchema = StringShortRefSchema;
export const UserLinksSchema = z.object({
  link: LinkShortSchema,
});

export const GroupsAllSchema = z.object({
  group: GroupInfoSchema,
});
export const GroupsPSchema = z.object({
  group: GroupPrincipalInfoSchema,
});
export const GroupsSSchema = z.object({
  group: GroupSecondaireInfoSchema,
});

export const UserWithLinksSchema = z.object({

  userFamilyName: StringNameSchema,
  userFirstName: StringNameSchema,
  userLinks: z.array(UserLinksSchema),

});



export const UserDatasConnectSchema = z.object({
  userId: z.number().int(),
  userFamilyName: StringNameSchema,
  userFirstName: StringNameSchema,
  userPsswd: BcryptHashSchema.nullable(),
  userPseudo: StringShortRefSchema.nullable(),
  userType: TypeUserDatasSchema,
  userIcon: FileNameSchema,
  grade: GradeSchema.nullable(),
  userGroups: z.array(GroupInfoSchema),
  groupsP : z.array(GroupPrincipalInfoSchema),
  groupsS : z.array(GroupSecondaireInfoSchema),
})

export const UserSessionConnectSchema = z.object({
  userId: z.number().int(),
  userFamilyName: StringNameSchema,
  userFirstName: StringNameSchema,
  userType: TypeUserDatasSchema,
  userIcon: FileNameSchema,
  grade: GradeSchema.nullable(),
  userGroups: z.array(GroupInfoSchema),
  groupsP : z.array(GroupPrincipalInfoSchema),
  groupsS : z.array(GroupSecondaireInfoSchema),
})

// Type TypeScript associé
export type UserWithLinksType = z.infer<typeof UserWithLinksSchema>;
export type UserPseudoType = z.infer<typeof UserPseudoSchema>;
export type UserDatasConnectType = z.infer<typeof UserDatasConnectSchema>;
export type UserSessionConnectType = z.infer<typeof UserSessionConnectSchema>