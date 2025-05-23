import {z} from "zod";

export const ColorHexaSchema = z.string()
  .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "Couleur hexadécimale invalide");

  export type ColorHexaType = z.infer<typeof ColorHexaSchema>;