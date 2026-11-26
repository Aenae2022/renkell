import SchoolController from "@srcBack/controller/SchoolController";
import { isAuthenticated } from "@srcBack/middleware/authMiddleware";
import { checkRoles } from "@srcBack/middleware/checkRoles";
import checkGradePostValid from "@srcBack/middleware/student/checkGradePostValid";
import checkPostUserFamilyName from "@srcBack/middleware/user/checkPostUserFamilyName";
import checkPostUserFirstName from "@srcBack/middleware/user/checkPostUserFirstName";
import { checkUserIdPostStudentValid, checkUserIdPostValid, checkUserIdValid } from "@srcBack/middleware/user/checkUserIdValid";
import express from "express";
const router = express.Router();

router.post("/getListGroupPrincipalBySchool",
    isAuthenticated, checkRoles(["ADMIN_SCHOOL"]),
    checkUserIdValid(),
    async (req, res) => await SchoolController.getListGroupPrincipalBySchool(req, res));

router.post("/getUserIdentity",
    isAuthenticated, checkRoles(["ADMIN_SCHOOL"]),
    checkUserIdPostValid(),
    async (req, res) => await SchoolController.getUserIdentity(req, res));

router.post("/updateFamilyName",
    isAuthenticated, checkRoles(["ADMIN_SCHOOL"]),
    checkUserIdPostValid(), checkPostUserFamilyName,
    async (req, res) => await SchoolController.updateFamilyName(req, res)
)

//modifie le prénom de l'utilisateur
router.post("/updateFirstName",
    isAuthenticated, checkRoles(["ADMIN_SCHOOL"]),
    checkUserIdPostValid(), checkPostUserFirstName,
    async (req, res) => await SchoolController.updateFirstName(req, res)
)

//modifie le niveau scolaire de l'étudiant
router.post("/updateGrade",
    isAuthenticated, checkRoles(["ADMIN_SCHOOL"]),
    checkUserIdPostStudentValid(), checkGradePostValid,
    async (req, res) => await SchoolController.updateGrade(req, res)
)
export default router;