"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinksDataSchema = exports.LinkDataSchema = exports.LinkShortSchema = void 0;
const zod_1 = require("zod");
const stringShortRef_schema_1 = require("./fields/stringShortRef.schema");
const stringNamePicture_schema_1 = require("./fields/stringNamePicture.schema");
const entierPositif_schema_1 = require("./fields/entierPositif.schema");
const stringNameTitle_schema_1 = require("./fields/stringNameTitle.schema");
exports.LinkShortSchema = zod_1.z.object({
    linkId: entierPositif_schema_1.EntierPositifSchema,
    linkRedirection: zod_1.z.string(),
    linkIcon: zod_1.z.string(),
    linkTitleBr: zod_1.z.string(),
    linkTitleFr: zod_1.z.string(),
});
exports.LinkDataSchema = zod_1.z.object({
    linkId: entierPositif_schema_1.EntierPositifSchema,
    linkName: stringShortRef_schema_1.StringShortRefSchema,
    titleFr: stringNameTitle_schema_1.StringNameTitleSchema.nullable(),
    titleBr: stringNameTitle_schema_1.StringNameTitleSchema.nullable(),
    redirection: zod_1.z.string().url(),
    icon: stringNamePicture_schema_1.StringNamePictureSchema,
    fullnameFr: zod_1.z.string().nullable(),
    fullnameBr: stringNameTitle_schema_1.StringNameTitleSchema.nullable(),
    matter: stringShortRef_schema_1.StringShortRefSchema,
    descriptionFr: zod_1.z.string().nullable(),
    descriptionBr: zod_1.z.string().nullable(),
    typeLink: zod_1.z.enum(["all", "teacher", "student"]),
    isPrivate: zod_1.z.boolean(),
    isAssociated: zod_1.z.boolean(),
    totalUsersWithAccess: zod_1.z.number(),
});
exports.LinksDataSchema = zod_1.z.array(exports.LinkDataSchema);
