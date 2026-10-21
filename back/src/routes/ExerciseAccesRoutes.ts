import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware";
import { checkRoles } from "../middleware/checkRoles";
import { checkUserIdPostIsUserIdConnected, checkUserIdValid } from "../middleware/user/checkUserIdValid";
import { checkAssociationUserGroupValid } from "../middleware/group/checkAssociationUserGroupValid";
import { checkLinkDatasValid } from "../middleware/link/checkLinkDatasValid";
import ExerciseAccessController from "../controller/ExerciseAccesController";
import { checkLinkExIdValid } from "@srcBack/middleware/link/checkLinkExIdValid";
import { checkListGroupsValid } from "@srcBack/middleware/exercise/checkListGroupsValid";
import { checkUserGroupsValid } from "@srcBack/middleware/exercise/checkUserGroupsValid";
const router = express.Router();

router.post("/associateLinkGroup",
    isAuthenticated, checkRoles(["TEACHER"]), checkUserIdValid(), checkUserIdPostIsUserIdConnected(),
    checkAssociationUserGroupValid,
    checkLinkDatasValid(),
    async (req, res) => await ExerciseAccessController.AssociateGroupUserExerciseAccess(req, res));

router.post("/getNbGroupAssociated",
    isAuthenticated, checkRoles(["TEACHER"]), checkUserIdValid(), checkUserIdPostIsUserIdConnected(),
    checkLinkExIdValid(),
    async (req, res) => await ExerciseAccessController.getNbGroupAssociatedUserIdExId(req, res))

router.post("/getListGroupAndAssociationExId",
    isAuthenticated, checkRoles(["TEACHER"]), checkUserIdValid(), checkUserIdPostIsUserIdConnected(),
    checkLinkExIdValid(),
    async (req, res) => await ExerciseAccessController.getListGroupAndAssociationExId(req, res))

router.post("/updateGroupAndAssociationExId",
    isAuthenticated, checkRoles(["TEACHER"]), checkUserIdValid(), checkUserIdPostIsUserIdConnected(),
    checkLinkDatasValid(),
    checkListGroupsValid(),
    checkUserGroupsValid(),
    async (req, res) => await ExerciseAccessController.updateGroupAndAssociationExId(req, res))

export default router;


