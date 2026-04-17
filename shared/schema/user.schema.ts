import { z } from "zod";
import { StringShortRefSchema } from "./fields/stringShortRef.schema";
import { StringNameSchema } from "./fields/stringName.schema";
import { GroupInfoSchema, GroupPrincipalInfoSchema, GroupSecondaireInfoSchema} from "./group.schema";
import { LinkShortSchema } from "./link.schema";
import { BcryptHashSchema } from "./fields/password.schema";
import FileNameSchema from "./fields/fileName.schema";
import { GradeSchema } from "./grade.schema";
import { SchoolSchema } from "./school.schema";
import { StringNameGroupSchema } from "./fields/stringNameGroup.schema";
import { UserRoleSchema } from "./role.schema";
import { EntierPositifSchema } from "./fields/entierPositif.schema";


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

export const UserGroupBdSchema = z.object({
  principal : z.boolean(),
  group : z.object({
    groupId : z.number(),
    groupName : StringNameGroupSchema
  })
})

export const UserWithLinksSchema = z.object({

  userFamilyName: StringNameSchema,
  userFirstName: StringNameSchema,
  userClassroomRef : StringShortRefSchema.nullable(),
  userLinks: z.array(UserLinksSchema),

});

export const UserDatasConnectSchema = z.object({
  userId: z.number().int(),
  userFamilyName: StringNameSchema,
  userFirstName: StringNameSchema,
  userPsswd: BcryptHashSchema.nullable(),
  userPseudo: StringShortRefSchema.nullable(),
  userRoles : z.array(UserRoleSchema),
  roleActivated : UserRoleSchema,
  userIcon: FileNameSchema,
  grade: GradeSchema.nullable(),
  userSchool : SchoolSchema.nullable(),
  userGroups: z.array(GroupInfoSchema),
  groupsP : z.array(GroupPrincipalInfoSchema),
  groupsS : z.array(GroupSecondaireInfoSchema),
})

export const UserDatasIdentitySchema = z.object({
  userId: z.number().int(),
  userFamilyName: StringNameSchema,
  userFirstName: StringNameSchema,
  userMail: z.string().email().nullable(),
  userPsswd: BcryptHashSchema.nullable(),
  userPseudo: StringShortRefSchema.nullable(),
  userRoles : z.array(UserRoleSchema),
  userIcon: FileNameSchema,
  grade: GradeSchema.nullable(),
  groupsP : z.array(GroupPrincipalInfoSchema),
  groupsS : z.array(GroupSecondaireInfoSchema),
})

export const UserSessionConnectSchema = z.object({
  userId: z.number().int(),
  userFamilyName: StringNameSchema,
  userFirstName: StringNameSchema,
  userRoles : z.array(UserRoleSchema),
  roleActivated : UserRoleSchema,
  userIcon: FileNameSchema,
  grade: GradeSchema.nullable(),
  userSchool : SchoolSchema.nullable(),
  userGroups: z.array(GroupInfoSchema),
  groupsP : z.array(GroupPrincipalInfoSchema),
  groupsS : z.array(GroupSecondaireInfoSchema),
})

export const StudentDatasSchema = z.object({
  userId: EntierPositifSchema,
  userFamilyName: StringNameSchema,
  userFirstName: StringNameSchema,
  grade: GradeSchema.nullable(),
  schoolId : EntierPositifSchema.nullable(),
  userGroups: z.array(GroupInfoSchema)
})

export const ParamsUsersDatasSchema = z.object({
  userId: EntierPositifSchema,
  userFamilyName: StringNameSchema,
  userFirstName: StringNameSchema,
  grade: GradeSchema.nullable(),
  schoolId : EntierPositifSchema.nullable(),
  userGroups: z.array(GroupInfoSchema).nullable()
})


export const UserMiniSchema = z.object({
  userId: z.number().int(),
  userName: StringNameSchema,
});

export const UserMiniListSchema = z.array(UserMiniSchema);



// Type TypeScript associé
export type UserWithLinksType = z.infer<typeof UserWithLinksSchema>;
export type UserPseudoType = z.infer<typeof UserPseudoSchema>;
export type UserDatasConnectType = z.infer<typeof UserDatasConnectSchema>;
export type UserSessionConnectType = z.infer<typeof UserSessionConnectSchema>
export type UserGroupBdType = z.infer<typeof UserGroupBdSchema>
export type UserMiniType = z.infer<typeof UserMiniSchema>
export type StudentDatasType = z.infer<typeof StudentDatasSchema>
export type UserDatasIdentityType = z.infer<typeof UserDatasIdentitySchema>
export type ParamsUsersDatasType = z.infer<typeof ParamsUsersDatasSchema>
