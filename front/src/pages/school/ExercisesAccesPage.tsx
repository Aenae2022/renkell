import { useParams } from "react-router-dom";
import validateToken from "@utils/validateToken";

export default function ExerciseAccessPage() {
    const { token } = useParams<{ token: string }>();
    const valid = validateToken(token, 12);

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

