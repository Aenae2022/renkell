"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeSchema = void 0;
const zod_1 = require("zod");
const entierPositif_schema_1 = require("./fields/entierPositif.schema");
const stringNameGroup_schema_1 = require("./fields/stringNameGroup.schema");
exports.GradeSchema = zod_1.z.object({
    gradeId: entierPositif_schema_1.EntierPositifSchema,
    gradeName: stringNameGroup_schema_1.StringNameGroupSchema
});
