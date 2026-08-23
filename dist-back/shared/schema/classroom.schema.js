"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassroomWithLinksSchema = exports.ClassroomShortSchema = exports.ClassroomSchema = exports.ClassroomRefSchema = void 0;
const zod_1 = require("zod");
const stringShortRef_schema_1 = require("./fields/stringShortRef.schema");
const colorHexa_schema_1 = require("./fields/colorHexa.schema");
const group_schema_1 = require("./group.schema");
const entierPositif_schema_1 = require("./fields/entierPositif.schema");
exports.ClassroomRefSchema = stringShortRef_schema_1.StringShortRefSchema;
exports.ClassroomSchema = zod_1.z.object({
    classroomId: entierPositif_schema_1.EntierPositifSchema,
    classroomNumber: zod_1.z.number(),
    classroomOrder: zod_1.z.number(),
    classroomBackgroundColor: colorHexa_schema_1.ColorHexaSchema,
    classroomBorderColor: colorHexa_schema_1.ColorHexaSchema,
    classroomColor: colorHexa_schema_1.ColorHexaSchema,
    classroomRef: exports.ClassroomRefSchema,
    group: zod_1.z.object({
        groupName: zod_1.z.string(),
    }).nullable(),
});
exports.ClassroomShortSchema = zod_1.z.object({
    classroomId: entierPositif_schema_1.EntierPositifSchema,
    classroomNumber: entierPositif_schema_1.EntierPositifSchema,
    classroomBackgroundColor: colorHexa_schema_1.ColorHexaSchema,
    classroomBorderColor: colorHexa_schema_1.ColorHexaSchema,
    classroomColor: colorHexa_schema_1.ColorHexaSchema,
});
exports.ClassroomWithLinksSchema = zod_1.z.object({
    classroomRef: exports.ClassroomRefSchema,
    group: group_schema_1.GroupLinksSchema,
});
