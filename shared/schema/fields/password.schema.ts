import { z } from 'zod';

// Schéma pour valider le mot de passe
export const PasswordSchema = z.string()
  .min(5, { message: "Le mot de passe doit contenir au moins 8 caractères" })
  .refine((value) => /[A-Z]/.test(value), {
    message: "Le mot de passe doit contenir au moins une lettre majuscule",
  })
  .refine((value) => /[a-z]/.test(value), {
    message: "Le mot de passe doit contenir au moins une lettre minuscule",
  })
  .refine((value) => /[0-9]/.test(value), {
    message: "Le mot de passe doit contenir au moins un chiffre",
  })
  .refine((value) => /[^A-Za-z0-9]/.test(value), {
    message: "Le mot de passe doit contenir au moins un caractère spécial",
  });


export const BcryptHashSchema = z.string().regex(
  /^\$2[aby]?\$\d{2}\$[./A-Za-z0-9]{53}$/,
  "Ce n'est pas un hash bcrypt valide"
);

export const PasswordShortSchema = z.string()
.trim()
.min(4, { message: "Le mot de passe doit contenir 4 chiffres" })
.max(4, { message: "Le mot de passe doit contenir 4 chiffres" })
.regex(/^[0-9]{4}$/,
    {
      message:
        "Caractères non autorisés",
    }
  )

export type PasswordType = z.infer<typeof PasswordSchema>;
export type PasswordShortType = z.infer<typeof PasswordShortSchema>;