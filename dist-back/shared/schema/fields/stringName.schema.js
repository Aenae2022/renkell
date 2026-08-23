"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringNameSchema = void 0;
const zod_1 = require("zod");
exports.StringNameSchema = zod_1.z
    .string()
    .trim()
    .min(2, { message: "Le nom ne peut pas être vide" })
    .max(50, { message: "Le nom est trop long" })
    .regex(/^[\p{L}A-Za-z'’\-. ]*$/u, {
    message: "Le nom ne peut contenir que des lettres, espaces, apostrophes ou tirets.",
});
