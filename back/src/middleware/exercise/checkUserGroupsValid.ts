import { Request, Response, NextFunction } from "express";
import { GroupForExerciseType, GroupInfoType, GroupsListForExerciseType } from "@shared/schema/group.schema";


export const checkUserGroupsValid = () => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { additions, deletions } = req.body;
        const user = req.user
        if (!user) {
            res.status(401).json({ message: "Non authentifié. middleware checkUserGroupsValid" });
            return;
        }
        const userGroups = user.userGroups

        if (hasUnauthorizedGroup(userGroups, additions) || hasUnauthorizedGroup(userGroups, deletions)) {
                res.status(403).json({ message: "Groupe invalide  middleware checkListGroupsValid" });
                return;
            }


        next(); // continuer si tout est OK
    };
}

const hasUnauthorizedGroup = (userGroups : GroupInfoType[], groupsList : GroupsListForExerciseType) => {
    const hasUnauthorized =
    groupsList.some(
            (elt: GroupForExerciseType) =>
                !userGroups.some(
                    (group: GroupInfoType) => group.groupId === elt.groupId
                )
        );
    return hasUnauthorized
}