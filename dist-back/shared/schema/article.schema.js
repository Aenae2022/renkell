"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleSchema = void 0;
const zod_1 = require("zod");
const entierPositif_schema_1 = require("./fields/entierPositif.schema");
const stringName_schema_1 = require("./fields/stringName.schema");
exports.ArticleSchema = zod_1.z.object({
    id: entierPositif_schema_1.EntierPositifSchema,
    color: stringName_schema_1.StringNameSchema,
    titleKey: zod_1.z.string(),
    descriptionKey: zod_1.z.string(),
    logoSrc: zod_1.z.string().url(),
    logoAlt: zod_1.z.string(),
    languages: zod_1.z.array(zod_1.z.string()),
    createdAt: zod_1.z.string().datetime(),
    links: zod_1.z.array(zod_1.z.object({
        index: zod_1.z.number(),
        label: zod_1.z.string(),
        url: zod_1.z.string().url(),
    })),
    domaineId: stringName_schema_1.StringNameSchema,
    sousdomaineId: stringName_schema_1.StringNameSchema,
    group: zod_1.z.object({
        groupName: zod_1.z.string(),
    }).nullable(),
    componentKey: zod_1.z.string().nullable(),
});
