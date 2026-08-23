"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringClassNameTailwindSchema = void 0;
const zod_1 = require("zod");
exports.StringClassNameTailwindSchema = zod_1.z
    .string()
    .trim()
    .min(1, { message: "Le nom ne peut pas être vide" })
    .regex(/^[a-zA-Z0-9\s\-_/:[\]().,%@!#=+'"`$*<>?&{}|\\^~]+$/, {
    message: "Certaines classes Tailwind sont invalides ou contiennent des caractères non autorisés",
});
