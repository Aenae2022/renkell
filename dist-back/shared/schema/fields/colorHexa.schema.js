"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorHexaSchema = void 0;
const zod_1 = require("zod");
exports.ColorHexaSchema = zod_1.z.string()
    .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "Couleur hexadécimale invalide");
