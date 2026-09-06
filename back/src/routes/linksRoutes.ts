import LinksController from "@srcBack/controller/LinksController";
import { isAuthenticated } from "@srcBack/middleware/authMiddleware";
import { checkRoles } from "@srcBack/middleware/checkRoles";
import checkGroupIdPostExists from "@srcBack/middleware/group/checkGroupIdPostExists";
import {checkLinkAssociationPostValid} from "@srcBack/middleware/link/checkLinkAssociationPostValid";
import { checkSchoolIdPostSpeExists } from "@srcBack/middleware/school/checkSchoilIdPostExists";
import { checkUserIdPostValid, checkUserIdValid } from "@srcBack/middleware/user/checkUserIdValid";
import express from "express";
const router = express.Router();

router.post("/globalLinksListByTeacher",
    isAuthenticated, checkRoles(["TEACHER"]), checkUserIdPostValid(), 
    async (req, res) => await LinksController.getUserLinksListData(req, res));

router.post("/globalLinksListByGroupStudent",
    isAuthenticated, checkRoles(["TEACHER"]), 
    checkUserIdPostValid(), 
    checkGroupIdPostExists,
    async (req, res) => await LinksController.globalLinksListByGroupStudent(req, res));
    
router.post("/getUsersList",
    isAuthenticated, checkRoles(["TEACHER"]), 
    checkUserIdPostValid(), 
    checkSchoolIdPostSpeExists,
    async (req, res) => await LinksController.getUserList(req, res));

router.post("/linkAssociation",
    isAuthenticated, checkRoles(["TEACHER"]), 
    checkLinkAssociationPostValid,
    async (req, res) => await LinksController.linkAssociation(req, res));

export default router;
