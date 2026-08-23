"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringNameTitleSchema = void 0;
const zod_1 = require("zod");
exports.StringNameTitleSchema = zod_1.z
    .string()
    .trim()
    .min(1, { message: "Le titre ne peut pas être vide" })
    .max(100, { message: "Le titre est trop long" })
    .regex(/^[\p{L}0-9'’\-–°,%:@\.!\?()\/ ]+$/u, {
    message: "Le titre ne peut contenir que des lettres, espaces, chiffres, apostrophes, tirets ou ponctuation simple (/:, . ! ? °).",
});
