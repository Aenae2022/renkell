import express from "express";
import { isAuthenticated } from "@srcBack/middleware/authMiddleware";
import { checkRoles } from "@srcBack/middleware/checkRoles";
import { checkUserIdValid } from "@srcBack/middleware/user/checkUserIdValid";
import DashboardController from "@srcBack/controller/DashboardController";

const router = express.Router();

router.get("/teacherLinksList",
    isAuthenticated, checkRoles(["TEACHER"]), checkUserIdValid(), 
    async (req, res) => await DashboardController.getTeacherLinksList(req, res));
export default router;
 