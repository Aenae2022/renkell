import { StringNameSchema } from "@shared/schema/fields/stringName.schema";
import ExerciseAccesModel from "@srcBack/model/ExerciseAccesModel";
import UserModel from "@srcBack/model/UserModel";
import { Request, Response, NextFunction } from "express";

export const checkUserAccesExerciseValid =  () => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { exerciseLink, groupId, userId } = req.body;
        if (!exerciseLink || !groupId || !userId) {
            console.error("Données absentes. middleware checkUserAccesExerciseValid")
            res.status(400).json({ message: "Données absentes." });
            return;
        }

        //on vérifie que le student est dans le group
        const isStudentInGroup = await UserModel.doesUserIdExistInGroupId(userId, groupId)
        if (!isStudentInGroup) {
            console.error("l'étudiant n'est pas dans ce groupe. middleware checkUserAccesExerciseValid")
            res.status(400).json({ message: "donnée invalide." });
            return;
        }
        //on vérifier que le group a accès à l'exercice
        const isGroupAssociatedWithLinkExercise = await ExerciseAccesModel.isGroupAssociatedWithLinkExercise(exerciseLink,groupId)
        if (!isGroupAssociatedWithLinkExercise) {
            console.error("ce groupe n'a pas accès à l'exercice. middleware checkUserAccesExerciseValid")
            res.status(400).json({ message: "donnée invalide." });
            return;
        }
        next(); // continuer si tout est OK
    };
}
