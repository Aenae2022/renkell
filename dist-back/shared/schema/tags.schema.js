"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecondaryTagSchema = exports.SecondaryTagDataSchema = exports.PrincipalTagSchema = exports.PrincipalTagDataSchema = void 0;
const zod_1 = require("zod");
const stringNameGroup_schema_1 = require("./fields/stringNameGroup.schema");
const stringClassNameTailwind_schema_1 = require("./fields/stringClassNameTailwind.schema");
exports.PrincipalTagDataSchema = zod_1.z.object({
    id: zod_1.z.number(),
    title: stringNameGroup_schema_1.StringNameGroupSchema,
    concerned: stringNameGroup_schema_1.StringNameGroupSchema,
    color: stringNameGroup_schema_1.StringNameGroupSchema,
});
exports.PrincipalTagSchema = zod_1.z.object({
    id: zod_1.z.number(), //id du group, de la classroom ou du user
    title: stringNameGroup_schema_1.StringNameGroupSchema, //titre de l'onglet
    concerned: stringNameGroup_schema_1.StringNameGroupSchema, //correspond au titre
    ref: stringNameGroup_schema_1.StringNameGroupSchema,
    tagStyle: stringClassNameTailwind_schema_1.StringClassNameTailwindSchema, //classname tailwind qui prend en charge une couleur spécifique
    tagStyleSelected: stringClassNameTailwind_schema_1.StringClassNameTailwindSchema, //classname tailwind qui prend en charge une couleur spécifique
    tagStyleTagAdd: stringClassNameTailwind_schema_1.StringClassNameTailwindSchema, //classname tailwind qui prend en charge une couleur spécifique});
});
exports.SecondaryTagDataSchema = zod_1.z.object({
    type: stringNameGroup_schema_1.StringNameGroupSchema, //équivalent de concerned
    title: stringNameGroup_schema_1.StringNameGroupSchema, //titre de l'onglet
    color: stringNameGroup_schema_1.StringNameGroupSchema, //couleur de référence pour l'onglet
    source: stringNameGroup_schema_1.StringNameGroupSchema, //la ref du tag principal correspond
});
exports.SecondaryTagSchema = zod_1.z.object({
    type: stringNameGroup_schema_1.StringNameGroupSchema, //équivalent de concerned
    title: stringNameGroup_schema_1.StringNameGroupSchema, //titre de l'onglet
    tagStyle: stringClassNameTailwind_schema_1.StringClassNameTailwindSchema, //classname tailwind qui prend en charge une couleur spécifique
    tagStyleSelected: stringClassNameTailwind_schema_1.StringClassNameTailwindSchema, //classname tailwind qui prend en charge une couleur spécifique
    tagStyleTagAdd: stringClassNameTailwind_schema_1.StringClassNameTailwindSchema, //classname tailwind qui prend en charge une couleur spécifique});
    tagSource: stringNameGroup_schema_1.StringNameGroupSchema
});
