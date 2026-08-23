"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringShortRefSchema = void 0;
const zod_1 = require("zod");
exports.StringShortRefSchema = zod_1.z
    .string()
    .min(1, "Requis")
    .max(50, "Trop long")
    .regex(/^[a-zA-Z0-9-_]+$/, "Format invalide");
