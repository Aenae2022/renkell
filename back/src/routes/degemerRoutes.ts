import express from "express";
import {checkSchoolRefExists} from "../middleware/school/checkSchoolRefExists";
import DegemerController from "../controller/DegemerController";
import checkClassroomRefExists from "../middleware/classroom/checkClassroomRefExists";
const router = express.Router();
console.log("Chargement des routes Degemer");
router.post("/classrooms",
    checkSchoolRefExists,
    async (req, res) => await DegemerController.getClassroomsList(req, res));
router.post("/classroomLinksList",
    (req, res, next) => {
    console.log("Route classroomLinksList atteinte");
    next();
  },
    checkClassroomRefExists,
    async (req, res) => await DegemerController.getClassroomLinksList(req, res));


export default router;
