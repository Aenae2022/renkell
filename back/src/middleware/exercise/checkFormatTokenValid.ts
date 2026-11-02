import { Request, Response, NextFunction } from "express";
import { GroupForExerciseType, GroupInfoType, GroupsListForExerciseType } from "@shared/schema/group.schema";
import { tokenClairSchema } from "@shared/schema/fields/token.schema";


export const checkFormatTokenValid = () => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { tokenClair } = req.body;
        if (!tokenClair) {
            console.error("token manquant. middleware checkFormatTokenValid")
            res.status(401).json({ message: "LinkInvalid" });
            return;
        }
        const parseToken = tokenClairSchema.safeParse(tokenClair)

        if (!parseToken.success) {
            console.error("error dans le middleware checkFormatTokenValid", parseToken.error.toString)
            res.status(403).json({ message: "LinkInvalid" });
            return;
        }

        req.body.tokenClair = parseToken.data
        next(); // continuer si tout est OK
    };
}

const hasUnauthorizedGroup = (userGroups: GroupInfoType[], groupsList: GroupsListForExerciseType) => {
    const hasUnauthorized =
        groupsList.some(
            (elt: GroupForExerciseType) =>
                !userGroups.some(
                    (group: GroupInfoType) => group.groupId === elt.groupId
                )
        );
    return hasUnauthorized
}