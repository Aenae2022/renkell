import SchoolController from "@srcBack/controller/SchoolController";
import { isAuthenticated } from "@srcBack/middleware/authMiddleware";
import { checkRoles } from "@srcBack/middleware/checkRoles";
import checkPostUserFamilyName from "@srcBack/middleware/user/checkPostUserFamilyName";
import { checkUserIdPostValid, checkUserIdValid } from "@srcBack/middleware/user/checkUserIdValid";
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
export default router;