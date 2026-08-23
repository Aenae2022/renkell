"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeUserDatasSchema = exports.TypeCTSchema = void 0;
const zod_1 = require("zod");
exports.TypeCTSchema = zod_1.z.enum(["c", "t"]);
exports.TypeUserDatasSchema = zod_1.z.enum(["student", "teacher", "admin", "invit"]);
