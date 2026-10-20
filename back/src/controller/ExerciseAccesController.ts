
import ExerciseAccesModel from "@srcBack/model/ExerciseAccesModel";
import { Request, Response } from "express";


export class ExerciseAccesController {

    static async AssociateGroupUserExerciseAccess(req: Request, res: Response) {
        const { groupId, userId, linkDatas } = req.body;
        //on récupère le token
        try {
            const tokenDatas = await ExerciseAccesModel.getOrCreateExerciseAccess(groupId, userId)
            if (!tokenDatas) {
                res.status(500).json({ message: "token non trouvé", reponse: false, result: null });
                return;
            }
            const addexp = await ExerciseAccesModel.createExerciseLink(tokenDatas.tokenHash, linkDatas)
            if (!addexp) {
                console.error("Erreur dans le ExerciseAccesContrôleur l'exercice n'a pas pu être créé");
                res.status(400).json({ message: "Erreur serveur", reponse: false, result: "" });
                return
            }

        }
        catch (error) {
            console.error("Erreur dans le ExerciseAccesContrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
            return
        }

        res.status(200).json({ message: "exercice associé", reponse: true, result: "" });
        return;

    }


}

export default ExerciseAccesController;
