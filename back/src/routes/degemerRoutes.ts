import express from "express";
import {checkSchoolRefExists} from "../middleware/school/checkSchoolRefExists";
import DegemerController from "../controller/DegemerController";
import checkUserPseudoExists from "../middleware/user/checkUserPseudoExists";
import checkSchoolValid from "../middleware/school/checkSchoolValid";
import checkClassroomRefExistsInSchool from "../middleware/classroom/checkClassroomRefExistsInSchool";
import { checkGroupExistsInClassroom } from "@srcBack/middleware/group/checkGroupExistsInClassroom";
import checkClassroomRefExists from "@srcBack/middleware/classroom/checkClassroomRefExists";
import checkClassroomIdPostExists from "@srcBack/middleware/classroom/checkClassroomIdPostExists";
const router = express.Router();

router.post("/classrooms",
    checkSchoolRefExists,
    async (req, res) => await DegemerController.getClassroomsList(req, res));

router.post("/classroomLinksList",
    checkSchoolValid, checkClassroomRefExistsInSchool,
    async (req, res) => await DegemerController.getClassroomLinksList(req, res));

router.post("/userLinksList",
    checkSchoolValid, checkUserPseudoExists,
    async (req, res) => await DegemerController.getUserLinksList(req, res));

router.post("/groupLinksList",
    checkClassroomIdPostExists, checkGroupExistsInClassroom(),
    async (req, res) => await DegemerController.getGroupLinksList(req, res));

router.post("/classroom",
    checkClassroomRefExists,
    async (req, res) => await DegemerController.getClassroom(req, res));

export default router;
