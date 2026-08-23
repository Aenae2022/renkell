"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringNameGroupSchema = void 0;
const zod_1 = require("zod");
exports.StringNameGroupSchema = zod_1.z
    .string()
    .trim()
    .min(1, { message: "Le nom ne peut pas être vide" })
    .max(50, { message: "Le nom est trop long" })
    .regex(/^[\p{L}0-9'’\- ]+$/u, {
    message: "Le nom ne peut contenir que des lettres, espaces, chiffres, , apostrophes ou tirets.",
});
