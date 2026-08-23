"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../model/UserModel"));
const GroupModel_1 = __importDefault(require("../model/GroupModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_schema_1 = require("@shared/schema/user.schema");
// import dotenv from "dotenv";
const changeType_1 = require("../../utils/changeType");
// dotenv.config();
class AuthController {
    static async validateConnection(req, res) {
        const { userPseudo, userPsswd } = req.body;
        try {
            //on récupère les datas de user si l'utilisateur existe
            const validatedUser = await UserModel_1.default.getUserByPseudo(userPseudo);
            if (!validatedUser || validatedUser.reponse === null) {
                res.status(400).json({ message: validatedUser.message || "header.login.badIdentification", reponse: null });
                return;
            }
            const parseResult = user_schema_1.UserDatasConnectSchema.safeParse(validatedUser.result);
            if (!parseResult.success) {
                console.error("Erreur de validation Zod :", parseResult.error.format());
                res.status(500).json({ message: "Erreur interne de validation" });
                return;
            }
            const myUser = parseResult.data; // ✅ bien typé
            if (myUser.userPsswd === null || myUser.userPsswd === undefined) {
                res.status(400).json({ message: "header.login.badIdentification", reponse: null });
                return;
            }
            // Vérifier le mot de passe
            let isMatch;
            try {
                isMatch = await bcrypt_1.default.compare(userPsswd, myUser.userPsswd);
            }
            catch (err) {
                console.error("Erreur de comparaison :", err);
                res.status(500).json({ message: "Erreur du serveur motdepasse" });
                return;
            }
            if (!isMatch) {
                res.status(400).json({ message: "header.login.badIdentification", reponse: null });
                return;
            }
            // s'il a au moins un groupe principal
            if (Array.isArray(myUser.groupsP) && myUser.groupsP.length > 0) {
                const groupId = myUser.groupsP[0].groupId;
            }
            //modificatin des données pour stockage en session
            const userSession = (0, changeType_1.toUserSession)(myUser);
            req.session.user = userSession;
            res.status(200).json({
                message: "header.login.goodIdentification",
                reponse: true,
            });
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
            return;
        }
    }
    static async logout(req, res) {
        try {
            const userDatas = req.session.user;
            // Redirection par défaut
            let redirection = '/degemer/0';
            // Si l'utilisateur est connecté et a une école
            if (userDatas?.userSchool?.schoolRef) {
                redirection = `/degemer/${userDatas.userSchool.schoolRef}`;
            }
            // s'il a au moins un groupe principal
            if (userDatas && Array.isArray(userDatas.groupsP) && userDatas.groupsP.length > 0) {
                const groupId = userDatas.groupsP[0].groupId;
                const refClassroomSearch = await GroupModel_1.default.getClassroomRefByGroupId(groupId);
                if (refClassroomSearch.reponse) {
                    redirection += `/c/${refClassroomSearch.result}`;
                }
            }
            req.session.destroy((err) => {
                if (err) {
                    console.error("Erreur lors de la destruction de session :", err);
                    return res.status(500).json({ success: false, message: "Erreur serveur lors de la déconnexion" });
                }
                res.clearCookie("connect.sid");
                res.json({ success: true, result: redirection });
            });
        }
        catch (error) {
            console.error("Erreur dans logout :", error);
            res.status(500).json({ success: false, message: "Erreur serveur dans logout" });
        }
    }
    // Role activation
    static async roleActivate(req, res) {
        const { role } = req.body;
        const userDatas = req.session.user;
        if (userDatas) {
            const newUserDatas = { ...userDatas, roleActivated: role };
            req.session.user = newUserDatas;
            res.json({ message: "", reponse: true, result: role });
        }
        else {
            res.json({ message: "", reponse: false, result: null });
        }
    }
    //return : succes, user (si réussi) / success, message (si échec)
    static async getSessionUser(req, res) {
        if (req.session.user) {
            res.json({ success: true, user: req.session.user });
        }
        else {
            res.json({ success: false, message: "Non connecté" });
        }
    }
}
exports.default = AuthController;
// router.post("/getClassroom", async (req, res) => {
//     const { groupPId } = req.body;
//     const classroomResponse = await GroupController.getClassroomOfPrincipalGroup(groupPId);
//     if (!classroomResponse) {
//         return res.status(404).json({ message: "classroom non trouvée" });
//     }
//     return res.status(200).json({ message: classroomResponse.message, response: classroomResponse.reponse});
// });
// router.post("/refresh-token", (req, res) => {
//     const oldToken = req.headers.authorization?.split(" ")[1];
//     if (!oldToken) {
//       return res.status(401).json({ message: "Token manquant" });
//     }
//     try {
//       const decoded = jwt.verify(oldToken, process.env.JWT_SECRET, { ignoreExpiration: true });
//       const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//       return res.status(200).json({ token: newToken });
//     } catch (err) {
//       return res.status(403).json({ message: "Token invalide" });
//     }
//   });
