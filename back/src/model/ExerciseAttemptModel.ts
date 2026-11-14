import { JbdbExerciseAttemptType } from "@shared/schema/exercise.schema";
import { prisma } from "@srcBack/lib/prisma/client";


export class ExerciseAttemptModel {

    static async saveAttemptJbdb(exerciseAttemptDatas : JbdbExerciseAttemptType)
        : Promise<boolean> {
        
        try {
            await prisma.exerciseAttempt.create({
                data: exerciseAttemptDatas,
                select:{
                    attemptId:true
                }
            });

            return true
        }
        catch (error) {
            throw error;
        }

    }
}