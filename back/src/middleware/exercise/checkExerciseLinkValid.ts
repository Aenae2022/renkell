import { Request, Response, NextFunction } from "express";
import { ExerciseLinkDatasSchema } from "@shared/schema/link.schema";


export const checkExerciseLinkDataValid = () => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { exerciseLink } = req.body;
        if (!exerciseLink) {
            console.error("données manquantes. middleware checkExerciseLinkValid")
            res.status(401).json({ message: "LinkInvalid" });
            return;
        }
        const parseLink = ExerciseLinkDatasSchema.safeParse(exerciseLink)

        if (!parseLink.success) {
            console.error("error dans le middleware checkExerciseLinkValid", parseLink.error.toString())
            res.status(403).json({ message: "LinkInvalid" });
            return;
        }

        req.body.exerciseLink = parseLink.data
        next(); // continuer si tout est OK
    };
}
