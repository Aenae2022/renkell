"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringNamePictureSchema = void 0;
const zod_1 = require("zod");
exports.StringNamePictureSchema = zod_1.z
    .string()
    .refine((val) => /\.(jpg|jpeg|png|jfif|gif|webp|svg)$/i.test(val), { message: 'Le fichier doit être une image valide (jpg, png, jfif, gif, etc.) : ',
    path: ['image']
});
