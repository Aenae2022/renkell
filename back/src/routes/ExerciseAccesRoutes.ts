import express from "express";
import { isAuthenticated } from "../middleware/authMiddleware";
import { checkRoles } from "../middleware/checkRoles";
import { checkUserIdPostIsUserIdConnected, checkUserIdPostStudentValid, checkUserIdValid } from "../middleware/user/checkUserIdValid";
import { checkAssociationUserGroupValid } from "../middleware/group/checkAssociationUserGroupValid";
import { checkLinkDatasValid } from "../middleware/link/checkLinkDatasValid";
import ExerciseAccessController from "../controller/ExerciseAccesController";
import { checkLinkExIdValid } from "@srcBack/middleware/exercise/checkLinkExIdValid";
import { checkListGroupsValid } from "@srcBack/middleware/exercise/checkListGroupsValid";
import { checkUserGroupsValid } from "@srcBack/middleware/exercise/checkUserGroupsValid";
import { checkFormatTokenValid } from "@srcBack/middleware/exercise/checkFormatTokenValid";
import { checkExerciseLinkDataValid } from "@srcBack/middleware/exercise/checkExerciseLinkValid";
import { checkInputUserPsswdShortValid } from "@srcBack/middleware/user/checkInputUserPsswdValid";
import checkGroupIdPostExists from "@srcBack/middleware/group/checkGroupIdPostExists";
import { checkUserAccesExerciseValid } from "@srcBack/middleware/exercise/checkUserAccesExerciseValid";
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

router.post("/tokenValidationAndGroup",
    checkExerciseLinkDataValid(),checkFormatTokenValid(),
    async (req, res) => await ExerciseAccessController.getGroupAndStudentsByExerciseLinkAndToken(req, res)); 

router.post("/isLoginValid",
    checkUserIdPostStudentValid(),checkInputUserPsswdShortValid, checkGroupIdPostExists, checkExerciseLinkDataValid() ,
    checkUserAccesExerciseValid(),
    async (req, res) => await ExerciseAccessController.isLoginValid(req, res)); 

export default router;


