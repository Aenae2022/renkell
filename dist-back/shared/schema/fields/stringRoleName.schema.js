"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringRoleNameSchema = void 0;
const zod_1 = require("zod");
exports.StringRoleNameSchema = zod_1.z
    .string()
    .min(1, { message: "Le nom ne peut pas être vide" })
    .max(50, { message: "Le nom est trop long" })
    .regex(/^[A-Z_]+$/, {
    message: "format de role incorrect",
});
