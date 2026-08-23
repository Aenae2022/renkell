"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleSchema = void 0;
const zod_1 = require("zod");
const stringRoleName_schema_1 = require("./fields/stringRoleName.schema");
const entierPositif_schema_1 = require("./fields/entierPositif.schema");
exports.UserRoleSchema = zod_1.z.object({
    roleId: entierPositif_schema_1.EntierPositifSchema,
    roleName: stringRoleName_schema_1.StringRoleNameSchema,
});
