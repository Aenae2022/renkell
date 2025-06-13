import LinksController from "@srcBack/controller/LinksController";
import { isAuthenticated } from "@srcBack/middleware/authMiddleware";
import { checkRoles } from "@srcBack/middleware/checkRoles";
import { checkMailPostValid } from "@srcBack/middleware/link/checkMailPostValid";
import express from "express";
const router = express.Router();

router.post("/send-email",
    isAuthenticated, checkRoles(["TEACHER"]), 
    checkMailPostValid,
    async (req, res) => await LinksController.newLinkMail(req, res));

export default router;