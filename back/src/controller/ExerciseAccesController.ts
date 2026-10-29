
import { GroupMiniType } from "@shared/schema/group.schema";
import { UserMiniType } from "@shared/schema/user.schema";
import ExerciseAccesModel from "@srcBack/model/ExerciseAccesModel";
import GroupModel from "@srcBack/model/GroupModel";
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

    static async updateGroupAndAssociationExId(req: Request, res: Response) {
        const { userId, linkDatas, additions, deletions } = req.body;
        //on appelle la transaction
        try {
            await ExerciseAccesModel.updateGroupAndAssociationExId(userId, linkDatas, additions, deletions);
            res.status(200).json({ message: "mise à jour réalisée", reponse: true, result: "" });
            return;
        }
        catch (error) {
            console.error("Erreur dans le ExerciseAccesContrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: false, result: "" });
            return
        }


    }

    static async getGroupAndStudentsByExerciseLinkAndToken(req: Request, res: Response) {
        const { exerciseLink, tokenClair } = req.body;
        try {

            const group = await ExerciseAccesModel.getGroupDataByExerciseToken(exerciseLink, tokenClair)

            //mise en forme des résultats.
            if (group === null) {
                console.error("pas de group correspondant au token et à l'exercice dans ExerciseAccesController getGroupAndStudentsByExerciseLinkAndToken ")
                res.status(400).json({ message: "linkInvalid", reponse: null, result: null });
                return;
            }
            const studentsList = await GroupModel.getStudentsListByGroupId(group.groupId)
            res.status(200).json({ message: studentsList.message, reponse: studentsList.reponse !== null, result: { group: group, studentsList: studentsList.result } });
            return;

        }
        catch (error) {
            console.error("Erreur dans le ExerciseAccesContrôleur - getGroupAndStudentsByExerciseLinkAndToken :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
            return
        }
    }

    static async getListGroupAndAssociationExId(req: Request, res: Response) {
        const { exId, userId } = req.body;
        try {

            const listGroups: {
                userGroups: {
                    group: {
                        exerciseAccesses: {
                            exerciselinks: {
                                linkExId: string;
                            }[];
                        }[];
                        groupId: number;
                        groupName: string;
                    };
                }[];
            } | null = await ExerciseAccesModel.getListGroupAndAssociationExId(exId, userId)

            //mise en forme des résultats.
            if (listGroups === null) {
                res.status(200).json({ message: "liste groupe récupérée", reponse: true, result: [] });
                return;
            }
            const listGroupsFormatted = listGroups.userGroups.map((group) => {
                return ({
                    groupId: group.group.groupId,
                    groupName: group.group.groupName,
                    isAssociated: group.group.exerciseAccesses.some((elt) => (elt.exerciselinks.length > 0)) ? true : false,
                })
            })
            res.status(200).json({ message: "liste groupe récupérée", reponse: true, result: listGroupsFormatted });
            return;
        }
        catch (error) {
            console.error("Erreur dans le ExerciseAccesContrôleur - getListGroupAndAssociationExId :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
            return
        }
    }

    static async getNbGroupAssociatedUserIdExId(req: Request, res: Response) {
        const { exId, userId } = req.body;
        try {
            const nbGroup = await ExerciseAccesModel.getNbGroupAssociatedByUserIdExId(exId, userId)
            res.status(200).json({ message: "groupe associé compté", reponse: true, result: nbGroup });
            return;
        }
        catch (error) {
            console.error("Erreur dans le ExerciseAccesContrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
            return
        }
    }


}

export default ExerciseAccesController;
