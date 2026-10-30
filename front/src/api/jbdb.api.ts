import type { UserMiniType } from "@shared/schema/user.schema";
import api from "./axios";
import { AxiosError } from "axios";
import type { GroupMiniType } from "@shared/schema/group.schema";
import {type EntierPositifType } from "@shared/schema/fields/entierPositif.schema";
import type { PasswordShortType } from "@shared/schema/fields/password.schema";

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

export const loginShort = async (userId: EntierPositifType, psswd: PasswordShortType, groupId:EntierPositifType, exId: string)
    : Promise<boolean | { message: string }> => {
    try {
        const isLoginValid = await api.post(
            "/api/exerciseAcces/isLoginValid",
            {
                userId: userId,
                userPsswd:psswd,
                groupId: groupId,
                exerciseLink: {
                    linkExId: exId,
                    linkRedirection: "jbdb",
                    linkParams: null,
                },
            },
        );
        if (isLoginValid.data.reponse === null) {
            return {message : isLoginValid.data.message}
        }

        return isLoginValid.data.reponse
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