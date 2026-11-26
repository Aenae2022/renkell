import { ExerciseAttemptModel } from "@srcBack/model/ExerciseAttemptModel";
import { Request, Response } from "express";


export class ExerciseAttemptController {

    static async saveAttempt(req: Request, res: Response) {
        const { exerciseAttemptDatas } = req.body;
        //on récupère le token
        try {
            const save = await ExerciseAttemptModel.saveAttemptJbdb(exerciseAttemptDatas)
            if (!save) {
                res.status(400).json({ message: "pas d'enregistrement de l'exercice", reponse: false});
                return;
            }
           

        }
        catch (error) {
            console.error("Erreur dans le ExerciseAttemptContrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: null});
            return
        }

        res.status(200).json({ message: "exercice enregistrée", reponse: true });
        return;

    }
}