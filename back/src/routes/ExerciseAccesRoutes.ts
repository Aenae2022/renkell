import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware";
import { checkRoles } from "../middleware/checkRoles";
import { checkUserIdPostIsUserIdConnected, checkUserIdValid    } from "../middleware/user/checkUserIdValid";
import { checkAssociationUserGroupValid } from "../middleware/group/checkAssociationUserGroupValid";
import { checkLinkDatasValid } from "../middleware/link/checkLinkDatasValid";
import ExerciseAccessController  from "../controller/ExerciseAccesController";
const router = express.Router();

router.post("/associateLinkGroup",
    isAuthenticated, checkRoles(["TEACHER"]), checkUserIdValid(),checkUserIdPostIsUserIdConnected(),
    checkAssociationUserGroupValid,
    checkLinkDatasValid(),
    async (req, res) => await ExerciseAccessController.AssociateGroupUserExerciseAccess(req, res));

export default router;


