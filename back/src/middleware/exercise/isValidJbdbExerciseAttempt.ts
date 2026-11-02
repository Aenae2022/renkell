import { JbdbExerciseAttemptSchema } from "@shared/schema/exercise.schema";
import { Request, Response, NextFunction } from "express";

export const isValidJbdbExerciseAttempt = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { exerciseAttemptDatas } = req.body;
    if (!exerciseAttemptDatas) {
      res.status(400).json({ message: "Données absentes. middleware isValidJbddExerciseAttempt" });
      return;
    }

    const validatedexerciseAttemptDatas = JbdbExerciseAttemptSchema.safeParse(exerciseAttemptDatas);

    if (!validatedexerciseAttemptDatas.success) {
      res.status(400).json({
        message: "exercice datas invalide.",
        details: validatedexerciseAttemptDatas.error.issues,
      });
      return;
    }

    req.body.exerciseAttemptDatas = validatedexerciseAttemptDatas.data; // Remplace les données de lien par les données validées    
    next(); // continuer si tout est OK
  };
}
