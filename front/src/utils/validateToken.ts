import { tokenSchema } from "@shared/schema/fields/token.schema";

export default function validateToken(token: string | undefined, nbCaracteres: number): boolean {
    // on vérifie que le token existe
    if (!token) {
        return false;
    }

    //on vérifie que le nbre de caractères demandé est un nombre entier positif compris entre 10 et 100
    if (nbCaracteres < 10 || nbCaracteres > 100 || !Number.isInteger(nbCaracteres)) {
        return false;
    }

    //on vérifie le nombre de caractères du token
    if (token.length !== nbCaracteres || !tokenSchema.safeParse(token).success) {
        return false;
    }
    
    return true;
}