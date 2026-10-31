import express from "express";

import { isValidJbdbExerciseAttempt } from "@srcBack/middleware/exercise/isValidJbdbExerciseAttempt";
import IsAssociatedUserGroupInExercise from "@srcBack/middleware/exercise/IsAssociatedUserGroupInExercise";
import { ExerciseAttemptController } from "@srcBack/controller/ExerciseAttemptController";
const router = express.Router();

router.post("/saveAttempt",
    isValidJbdbExerciseAttempt(), IsAssociatedUserGroupInExercise,
    async (req, res) => await ExerciseAttemptController.saveAttempt(req, res));



export default router;


