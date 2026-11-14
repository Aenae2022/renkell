import { z } from "zod";

export const NiveauScolaireSchema = z.enum([
    "CP",
    "CE1",
    "CE2",
    "CM1",
    "CM2",
]);

export const FamilleCompetenceIdSchema = z.enum([
    "faits-numeriques",
    "numeration",
    "procedures",
]);

export const ObjectifCompetenceIdSchema = z.enum([ //CM1-CM2
    // FAMILLE 1 : MÉMORISER DES FAITS NUMÉRIQUES

    "memoriser-tables-multiplication",
    "memoriser-tables-addition",
    "moitie-nombres-impairs",
    "relations-fractions-usuelles",
    "ecriture-decimale-fractions-usuelles",

    // FAMILLE 2 : UTILISER SES CONNAISSANCES EN NUMÉRATION

    "ajouter-soustraire-decimal-sans-retenue",
    "ajouter-decimal-avec-retenue",
    "multiplier-entier-10-100-1000",
    "multiplier-decimal-10",
    "multiplier-decimal-10-100-1000",
    "diviser-decimal-10",
    "diviser-decimal-10-100-1000",

    // FAMILLE 3 : APPRENDRE DES PROCÉDURES DE CALCUL MENTAL

    "ajouter-soustraire-nombres-proches",
    "addition-deux-decimaux",
    "multiplier-entier-dizaines-centaines",
    "multiplier-nombres-dizaines-centaines-milliers",
    "multiplier-entier-4-8",
    "diviser-entier-4-8",
    "multiplier-entier-5",
    "multiplier-decimal-5",
    "distributivite-multiplication-addition",
    "double-decimal",
    "moitie-decimal",
    "multiplier-decimal-50",
]);



export const DescripteurCompetenceSchema = z.object({
    id: z.string(),
    label: z.string(),
});

export const ObjectifCompetenceSchema = z.object({
    id: ObjectifCompetenceIdSchema,
    label: z.string(),
    niveaux: z.partialRecord(
        NiveauScolaireSchema,
        z.array(z.string())
    ),
    descripteurs: z.array(DescripteurCompetenceSchema).optional(),
});

export const FamilleCompetenceSchema = z.object({
    id: FamilleCompetenceIdSchema,
    label: z.string(),
    objectifs: z.array(ObjectifCompetenceSchema),
});

export type NiveauScolaire = z.infer<typeof NiveauScolaireSchema>;
export type DescripteurCompetence = z.infer<typeof DescripteurCompetenceSchema>;
export type ObjectifCompetence = z.infer<typeof ObjectifCompetenceSchema>;
export type FamilleCompetence = z.infer<typeof FamilleCompetenceSchema>;
export type FamilleCompetenceId = z.infer<typeof FamilleCompetenceIdSchema>;
export type ObjectifCompetenceId = z.infer<typeof ObjectifCompetenceIdSchema>;