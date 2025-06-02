import { z } from "zod";
import {StringNameGroupSchema} from "./fields/stringNameGroup.schema"
import {StringClassNameTailwindSchema} from "./fields/stringClassNameTailwind.schema"


export const PrincipalTagDataSchema = z.object({
  id: z.number(),
  title: StringNameGroupSchema,
  concerned: StringNameGroupSchema,
  color: StringNameGroupSchema,
});

export const PrincipalTagSchema = z.object({
    id: z.number(), //id du group, de la classroom ou du user
    title: StringNameGroupSchema,  //titre de l'onglet
    concerned: StringNameGroupSchema,  //correspond au titre
    ref:StringNameGroupSchema,
    tagStyle: StringClassNameTailwindSchema, //classname tailwind qui prend en charge une couleur spécifique
    tagStyleSelected: StringClassNameTailwindSchema, //classname tailwind qui prend en charge une couleur spécifique
    tagStyleTagAdd: StringClassNameTailwindSchema, //classname tailwind qui prend en charge une couleur spécifique});
});

export const SecondaryTagDataSchema = z.object({
    type: StringNameGroupSchema,  //équivalent de concerned
    title: StringNameGroupSchema, //titre de l'onglet
    color: StringNameGroupSchema, //couleur de référence pour l'onglet
    source: StringNameGroupSchema, //la ref du tag principal correspond
})

export const SecondaryTagSchema = z.object({
    type: StringNameGroupSchema,  //équivalent de concerned
    title : StringNameGroupSchema, //titre de l'onglet
    tagStyle: StringClassNameTailwindSchema, //classname tailwind qui prend en charge une couleur spécifique
    tagStyleSelected: StringClassNameTailwindSchema, //classname tailwind qui prend en charge une couleur spécifique
    tagStyleTagAdd: StringClassNameTailwindSchema, //classname tailwind qui prend en charge une couleur spécifique});
    tagSource:StringNameGroupSchema
})

export type PrincipalTagDataType = z.infer<typeof PrincipalTagDataSchema>;
export type PrincipalTagType = z.infer<typeof PrincipalTagSchema>;
export type SecondaryTagDataType = z.infer<typeof SecondaryTagDataSchema>;
export type SecondaryTagType = z.infer<typeof SecondaryTagSchema>;