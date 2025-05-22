import express from "express";
import {checkSchoolRefExists} from "../middleware/school/checkSchoolRefExists";
import DegemerController from "../controller/DegemerController";
const router = express.Router();

router.post("/classrooms",
    checkSchoolRefExists,
    async (req, res) => await DegemerController.getClassroomsList(req, res));


export default router;
