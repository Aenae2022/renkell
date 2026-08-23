"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolWithClassroomsSchema = exports.SchoolSchema = exports.SchoolRefSchema = void 0;
const zod_1 = require("zod");
const stringShortRef_schema_1 = require("./fields/stringShortRef.schema");
const classroom_schema_1 = require("./classroom.schema");
exports.SchoolRefSchema = stringShortRef_schema_1.StringShortRefSchema;
exports.SchoolSchema = zod_1.z.object({
    schoolId: zod_1.z.number().int(),
    schoolName: zod_1.z.string().min(1, "Nom de l'école requis"),
    schoolRef: exports.SchoolRefSchema,
});
exports.SchoolWithClassroomsSchema = exports.SchoolSchema.extend({
    classrooms: zod_1.z.array(classroom_schema_1.ClassroomSchema)
});
