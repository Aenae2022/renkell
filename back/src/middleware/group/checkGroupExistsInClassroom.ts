import { Request, Response, NextFunction } from "express";
import { EntierPositifSchema, EntierPositifType } from "@shared/schema/fields/entierPositif.schema";
import GroupModel from "@srcBack/model/GroupModel";

export const checkGroupExistsInClassroom = () => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { groupId, classroomId } = req.body;

        if (!groupId || !classroomId) {
            console.error("Données manquantes ou invalides middleware checkGroupExistsInClassroom")
            res.status(404).json({ message: "page non trouvée" });
            return;
        }

        //validation avec zod
        const verifGroupId = EntierPositifSchema.safeParse(groupId);
        const verifClassroomId = EntierPositifSchema.safeParse(classroomId);
        if (!verifGroupId.success || !verifClassroomId.success) {
            console.error("données invalides. middleware checkGroupExistsInClassroom")
            res.status(404).json({ message: "page non trouvée" });
            return;
        }

        const newGroupId: EntierPositifType = verifGroupId.data;
        const newClassroomId: EntierPositifType = verifClassroomId.data

        //vérif en bd
        try {
            const verificationBd = await GroupModel.doesGroupExistInClassroom(newGroupId, newClassroomId)
            if (!verificationBd) {
                console.error("association invalide. middleware checkGroupExistsInClassroom")
                res.status(400).json({ message: "page non trouvée" });
                return;
            }

            req.body.groupId = newGroupId;
            req.body.classroomId = newClassroomId;
            next(); // continuer si tout est OK
        } catch (error) {
            console.error("checkAssociationUserGroupValid")
            console.error(error);
            res.status(500).json({
                message: "Erreur interne du serveur."
            });
            return;
        }
    }
};
