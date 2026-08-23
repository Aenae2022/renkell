"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMiniListSchema = exports.UserMiniSchema = exports.ParamsUsersDatasSchema = exports.StudentDatasSchema = exports.UserSessionConnectSchema = exports.UserDatasIdentitySchema = exports.UserDatasConnectSchema = exports.UserWithLinksSchema = exports.UserGroupBdSchema = exports.GroupsSSchema = exports.GroupsPSchema = exports.GroupsAllSchema = exports.UserLinksSchema = exports.UserPseudoSchema = void 0;
const zod_1 = require("zod");
const stringShortRef_schema_1 = require("./fields/stringShortRef.schema");
const stringName_schema_1 = require("./fields/stringName.schema");
const group_schema_1 = require("./group.schema");
const link_schema_1 = require("./link.schema");
const password_schema_1 = require("./fields/password.schema");
const fileName_schema_1 = __importDefault(require("./fields/fileName.schema"));
const grade_schema_1 = require("./grade.schema");
const school_schema_1 = require("./school.schema");
const stringNameGroup_schema_1 = require("./fields/stringNameGroup.schema");
const role_schema_1 = require("./role.schema");
const entierPositif_schema_1 = require("./fields/entierPositif.schema");
exports.UserPseudoSchema = stringShortRef_schema_1.StringShortRefSchema;
exports.UserLinksSchema = zod_1.z.object({
    link: link_schema_1.LinkShortSchema,
});
exports.GroupsAllSchema = zod_1.z.object({
    group: group_schema_1.GroupInfoSchema,
});
exports.GroupsPSchema = zod_1.z.object({
    group: group_schema_1.GroupPrincipalInfoSchema,
});
exports.GroupsSSchema = zod_1.z.object({
    group: group_schema_1.GroupSecondaireInfoSchema,
});
exports.UserGroupBdSchema = zod_1.z.object({
    principal: zod_1.z.boolean(),
    group: zod_1.z.object({
        groupId: zod_1.z.number(),
        groupName: stringNameGroup_schema_1.StringNameGroupSchema
    })
});
exports.UserWithLinksSchema = zod_1.z.object({
    userFamilyName: stringName_schema_1.StringNameSchema,
    userFirstName: stringName_schema_1.StringNameSchema,
    userClassroomRef: stringShortRef_schema_1.StringShortRefSchema.nullable(),
    userLinks: zod_1.z.array(exports.UserLinksSchema),
});
exports.UserDatasConnectSchema = zod_1.z.object({
    userId: zod_1.z.number().int(),
    userFamilyName: stringName_schema_1.StringNameSchema,
    userFirstName: stringName_schema_1.StringNameSchema,
    userPsswd: password_schema_1.BcryptHashSchema.nullable(),
    userPseudo: stringShortRef_schema_1.StringShortRefSchema.nullable(),
    userRoles: zod_1.z.array(role_schema_1.UserRoleSchema),
    roleActivated: role_schema_1.UserRoleSchema,
    userIcon: fileName_schema_1.default,
    grade: grade_schema_1.GradeSchema.nullable(),
    userSchool: school_schema_1.SchoolSchema.nullable(),
    userGroups: zod_1.z.array(group_schema_1.GroupInfoSchema),
    groupsP: zod_1.z.array(group_schema_1.GroupPrincipalInfoSchema),
    groupsS: zod_1.z.array(group_schema_1.GroupSecondaireInfoSchema),
});
exports.UserDatasIdentitySchema = zod_1.z.object({
    userId: zod_1.z.number().int(),
    userFamilyName: stringName_schema_1.StringNameSchema,
    userFirstName: stringName_schema_1.StringNameSchema,
    userMail: zod_1.z.string().email().nullable(),
    userPsswd: password_schema_1.BcryptHashSchema.nullable(),
    userPseudo: stringShortRef_schema_1.StringShortRefSchema.nullable(),
    userRoles: zod_1.z.array(role_schema_1.UserRoleSchema),
    userIcon: fileName_schema_1.default,
    grade: grade_schema_1.GradeSchema.nullable(),
    groupsP: zod_1.z.array(group_schema_1.GroupPrincipalInfoSchema),
    groupsS: zod_1.z.array(group_schema_1.GroupSecondaireInfoSchema),
});
exports.UserSessionConnectSchema = zod_1.z.object({
    userId: zod_1.z.number().int(),
    userFamilyName: stringName_schema_1.StringNameSchema,
    userFirstName: stringName_schema_1.StringNameSchema,
    userRoles: zod_1.z.array(role_schema_1.UserRoleSchema),
    roleActivated: role_schema_1.UserRoleSchema,
    userIcon: fileName_schema_1.default,
    grade: grade_schema_1.GradeSchema.nullable(),
    userSchool: school_schema_1.SchoolSchema.nullable(),
    userGroups: zod_1.z.array(group_schema_1.GroupInfoSchema),
    groupsP: zod_1.z.array(group_schema_1.GroupPrincipalInfoSchema),
    groupsS: zod_1.z.array(group_schema_1.GroupSecondaireInfoSchema),
});
exports.StudentDatasSchema = zod_1.z.object({
    userId: entierPositif_schema_1.EntierPositifSchema,
    userFamilyName: stringName_schema_1.StringNameSchema,
    userFirstName: stringName_schema_1.StringNameSchema,
    grade: grade_schema_1.GradeSchema.nullable(),
    schoolId: entierPositif_schema_1.EntierPositifSchema.nullable(),
    userGroups: zod_1.z.array(group_schema_1.GroupInfoSchema)
});
exports.ParamsUsersDatasSchema = zod_1.z.object({
    userId: entierPositif_schema_1.EntierPositifSchema,
    userFamilyName: stringName_schema_1.StringNameSchema,
    userFirstName: stringName_schema_1.StringNameSchema,
    grade: grade_schema_1.GradeSchema.nullable(),
    schoolId: entierPositif_schema_1.EntierPositifSchema.nullable(),
    userGroups: zod_1.z.array(group_schema_1.GroupInfoSchema).nullable()
});
exports.UserMiniSchema = zod_1.z.object({
    userId: zod_1.z.number().int(),
    userName: stringName_schema_1.StringNameSchema,
});
exports.UserMiniListSchema = zod_1.z.array(exports.UserMiniSchema);
