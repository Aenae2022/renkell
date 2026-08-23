"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntierPositifSchema = void 0;
const zod_1 = require("zod");
exports.EntierPositifSchema = zod_1.z.number().int().min(0);
