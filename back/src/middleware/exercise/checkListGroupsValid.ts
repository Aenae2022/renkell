import { Request, Response, NextFunction } from "express";
import { GroupsListForExerciseSchema, GroupsListForExerciseType } from "@shared/schema/group.schema";


export const checkListGroupsValid = () => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { additions, deletions } = req.body;

        if (!additions || !Array.isArray(additions) || !deletions || !Array.isArray(deletions)) {
            res.status(400).json({ message: "Données manquantes ou invalides middleware checkListGroupsValid" });
            return;
        }

        //validation avec zod
        let validatedAdditions : GroupsListForExerciseType = [];
        if (additions.length !== 0) {
            const validateAdditions = GroupsListForExerciseSchema.safeParse(additions);
            if(!validateAdditions.success){
                res.status(400).json({ message: "additions invalide. middleware checkListGroupsValid" });
            return;
            }
            validatedAdditions = validateAdditions.data;
        }

        let validatedDeletions : GroupsListForExerciseType= [];
        if (deletions.length !== 0) {
            const validateDeletions = GroupsListForExerciseSchema.safeParse(deletions);
            if(!validateDeletions.success){
                res.status(400).json({ message: "deletions invalide. middleware checkListGroupsValid" });
            return;
            }
            validatedDeletions = validateDeletions.data;
        }

        req.body.additions = validatedAdditions;
        req.body.deletions = validatedDeletions;
        next(); // continuer si tout est OK
    };
}