import { z } from "zod";
import { StringShortRefSchema } from "./fields/stringShortRef.schema";
import { ColorHexaSchema } from "./fields/colorHexa.schema";
import { StringNameSchema } from "./fields/stringName.schema";
import { groupInfoSchema, GroupLinksSchema, groupPrincipalInfoSchema, groupSecondaireInfoSchema} from "./group.schema";
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
  group: groupInfoSchema,
});
export const GroupsPSchema = z.object({
  group: groupPrincipalInfoSchema,
});
export const GroupsSSchema = z.object({
  group: groupSecondaireInfoSchema,
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
  userGroups: z.array(groupInfoSchema),
  groupsP : z.array(groupPrincipalInfoSchema),
  groupsS : z.array(groupSecondaireInfoSchema),
})

// Type TypeScript associé
export type UserWithLinksType = z.infer<typeof UserWithLinksSchema>;
export type UserPseudoType = z.infer<typeof UserPseudoSchema>;
export type UserDatasConnectType = z.infer<typeof UserDatasConnectSchema>;