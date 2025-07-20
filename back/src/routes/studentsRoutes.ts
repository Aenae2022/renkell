import StudentsController from "@srcBack/controller/StudentsController";
import { isAuthenticated } from "@srcBack/middleware/authMiddleware";
import { checkRoles } from "@srcBack/middleware/checkRoles";
import checkGroupIdPostExists from "@srcBack/middleware/group/checkGroupIdPostExists";
import { checkUserIdPostValid, checkUserIdValid } from "@srcBack/middleware/user/checkUserIdValid";
import express from "express";
const router = express.Router();

router.post("/getStudentsListBySchool",
    isAuthenticated, checkRoles(["TEACHER"]),
    checkUserIdValid(), 
    async (req, res) => await StudentsController.getStudentsListBySchool(req, res));

router.post("/removeStudentFromGroup",
    isAuthenticated, checkRoles(["TEACHER"]),
    checkUserIdPostValid(), checkGroupIdPostExists,
    async (req, res) => await StudentsController.removeStudentFromGroup(req, res));

export default router;
