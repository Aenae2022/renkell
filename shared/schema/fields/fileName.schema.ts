import { z } from "zod";

const FileNameSchema = z.string()
  .min(1, "Le nom de fichier ne peut pas être vide")
  .max(255, "Le nom de fichier est trop long")
  .transform(name =>
    // 1. Passage en forme décomposée pour séparer base + diacritiques
    name.normalize("NFD")
      // 2. On vire les diacritiques (accents)
      .replace(/\p{Diacritic}/gu, "")
      // 3. On supprime tous les espaces
      .replace(/\s+/g, "")
  )
  // 4. On vérifie que le résultat final ne contient que ce qu'on autorise
  .refine(cleanName => /^[A-Za-z0-9._-]+$/.test(cleanName), {
    message: "Le nom nettoyé ne peut contenir que lettres, chiffres, '.', '_' ou '-'"
  })
  // 5. (Optionnel) On peut renommer le type si besoin
  .pipe(z.string()); // on finit sur un ZodString "propre"

export default FileNameSchema;
