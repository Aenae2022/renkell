import StudentsController from "@srcBack/controller/StudentsController";
import { isAuthenticated } from "@srcBack/middleware/authMiddleware";
import { checkRoles } from "@srcBack/middleware/checkRoles";
import checkGroupIdPostExists from "@srcBack/middleware/group/checkGroupIdPostExists";
import checkPrincipalGroup from "@srcBack/middleware/student/checkPrincipalGroup";
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

router.post("/addStudentToGroup",
    isAuthenticated, checkRoles(["TEACHER"]),
    checkUserIdPostValid(), checkGroupIdPostExists, checkPrincipalGroup,
    async (req, res) => await StudentsController.addStudentToGroup(req, res));
   
router.post("/getGroupById",
    isAuthenticated, checkRoles(["TEACHER"]),
    checkGroupIdPostExists,
    async (req, res) => await StudentsController.getGroupById(req, res));

export default router;
