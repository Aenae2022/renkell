"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refLeconSchema = void 0;
const zod_1 = require("zod");
exports.refLeconSchema = zod_1.z
    .string()
    .trim()
    .max(10, "La référence ne doit pas dépasser 10 caractères.");
