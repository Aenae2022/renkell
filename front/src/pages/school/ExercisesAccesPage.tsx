import { useParams } from "react-router-dom";
import { tokenSchema } from "@shared/schema/fields/token.schema";

export default function ExerciseAccessPage() {
    const { token } = useParams<{ token: string }>();
    const valid = validateToken(token);

    if(!valid) {
        return (
            <div>
                <h1>Accès à un exercice</h1>
                <p>Jeton invalide ou manquant.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Accès à un exercice</h1>
            <p>Jeton reçu : {token}</p>
        </div>
    );
}

function validateToken(token: string | undefined): boolean {
    // on vérifie que le token existe
    if (!token) {
        return false;
    }
    
    //on vérifie le nombre de caractères du token (12 caractères) le nombre de caractères pouvant variés en fonction des cas
    if (token.length !== 12 || !tokenSchema.safeParse(token).success) {
        return false;
    }
    
    return true;
}