"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupMiniSchema = exports.GroupSecondaireInfoSchema = exports.GroupPrincipalInfoSchema = exports.GroupInfoSchema = exports.GroupLinksSchema = exports.GroupLinkSchema = void 0;
const zod_1 = require("zod");
const link_schema_1 = require("./link.schema");
const stringNameGroup_schema_1 = require("./fields/stringNameGroup.schema");
const entierPositif_schema_1 = require("./fields/entierPositif.schema");
exports.GroupLinkSchema = zod_1.z.object({
    link: link_schema_1.LinkShortSchema,
});
exports.GroupLinksSchema = zod_1.z.object({
    groupId: entierPositif_schema_1.EntierPositifSchema,
    groupName: stringNameGroup_schema_1.StringNameGroupSchema,
    groupLinks: zod_1.z.array(exports.GroupLinkSchema),
});
exports.GroupInfoSchema = zod_1.z.object({
    groupId: entierPositif_schema_1.EntierPositifSchema,
    groupName: stringNameGroup_schema_1.StringNameGroupSchema,
    principal: zod_1.z.boolean(),
});
exports.GroupPrincipalInfoSchema = zod_1.z.object({
    groupId: entierPositif_schema_1.EntierPositifSchema,
    groupName: stringNameGroup_schema_1.StringNameGroupSchema,
    principal: zod_1.z.literal(true),
});
exports.GroupSecondaireInfoSchema = zod_1.z.object({
    groupId: entierPositif_schema_1.EntierPositifSchema,
    groupName: stringNameGroup_schema_1.StringNameGroupSchema,
    principal: zod_1.z.literal(false),
});
exports.GroupMiniSchema = zod_1.z.object({
    groupId: entierPositif_schema_1.EntierPositifSchema,
    groupName: stringNameGroup_schema_1.StringNameGroupSchema,
});
