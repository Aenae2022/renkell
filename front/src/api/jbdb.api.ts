import type { UserMiniType } from "@shared/schema/user.schema";
import api from "./axios";
import { AxiosError } from "axios";
import type { GroupMiniType } from "@shared/schema/group.schema";

export const tokenValidationAndGroup = async (exId: string, token: string)
    : Promise<{ group: GroupMiniType, studentsList: UserMiniType[] } | { message: string }> => {
    try {
        const myAssociation = await api.post(
            "/api/exerciseAcces/tokenValidationAndGroup",
            {
                exerciseLink: {
                    linkExId: exId,
                    linkRedirection: "jbdb",
                    linkParams: null,
                },
                tokenClair: token
            },
        );
        if (myAssociation.data.reponse === null) {
            return {message : myAssociation.data.message}
        }

        return myAssociation.data.result
    }
    catch (error: unknown) {
        // Utilisation de `unknown` pour éviter `any`
        if (error instanceof AxiosError && error.response) {
            return ({ message: error.response.data.message }); // Message d'erreur du backend
        } else {
            return ({ message: "Erreur serveur !" });
        }
    }
}