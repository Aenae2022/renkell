import { z } from 'zod';

export const StringNamePictureSchema = z
  .string()
  .refine(
    (val) => /\.(jpg|jpeg|png|jfif|gif|webp|svg)$/i.test(val),
    { message: 'Le fichier doit être une image valide (jpg, png, jfif, gif, etc.) : ',
      path: ['image']
     }
  );

  export type StringNamePictureType = z.infer<typeof StringNamePictureSchema>
