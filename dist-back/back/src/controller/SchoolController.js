"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entierPositif_schema_1 = require("@shared/schema/fields/entierPositif.schema");
const group_schema_1 = require("@shared/schema/group.schema");
const user_schema_1 = require("@shared/schema/user.schema");
const GroupModel_1 = __importDefault(require("@srcBack/model/GroupModel"));
const UserModel_1 = __importDefault(require("@srcBack/model/UserModel"));
class SchoolController {
    static async getListGroupPrincipalBySchool(req, res) {
        const { user } = req.body;
        try {
            if (user.userSchool.schoolId === null || user.userSchool.schoolId === undefined) {
                //TODO cas sans école
            }
            else {
                const groupsDatas = await GroupModel_1.default.getGroupPrincipalBySchoolId(user.schoolId);
                if (groupsDatas.length === 0) {
                    res.status(200).json({ message: "nogroup", reponse: false, result: [] });
                    return;
                }
                //on valide les données avec Zod
                const parsedGroups = groupsDatas.map((group) => {
                    const newGroup = {
                        groupId: group.groupId,
                        groupName: group.groupName
                    };
                    const parsed = group_schema_1.GroupMiniSchema.safeParse(newGroup);
                    if (!parsed.success) {
                        return ({ groupId: 0, groupName: "error" });
                    }
                    return newGroup;
                });
                res.status(200).json({ message: 'réussite', reponse: true, result: parsedGroups });
                return;
            }
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur schoolController, getListGroupPrincipalBySchool", reponse: null, result: [] });
            return;
        }
    }
    static async getUserIdentity(req, res) {
        const { userId } = req.body;
        try {
            const userDatas = await UserModel_1.default.getUserIdentity(userId);
            if (!userDatas.reponse) {
                res.status(200).json(userDatas);
            }
            //Reconstruire le tableau des groupes :
            const groupes = userDatas.result.userGroups.map((g) => ({
                groupId: g.group.groupId,
                groupName: g.group.groupName,
                principal: g.principal
            }));
            // Séparer groupes principal et secondaire 
            const groupesPrincipaux = groupes.filter((g) => g.principal);
            const groupesSecondaires = groupes.filter((g) => !g.principal);
            //construire le tableau des roles
            const roles = userDatas.result.userRoles.map((r) => ({
                roleId: r.roles.roleId,
                roleName: r.roles.roleName,
            }));
            // On reconstruit l'objet final
            const result = {
                userId: userDatas.result.userId,
                userFamilyName: userDatas.result.userFamilyName,
                userFirstName: userDatas.result.userFirstName,
                userMail: userDatas.result.userMail,
                userPsswd: userDatas.result.userPsswd,
                userPseudo: userDatas.result.userPseudo,
                userRoles: roles,
                userIcon: userDatas.result.userIcon,
                grade: userDatas.result.grade, // correspond à GradeSchema
                userGroups: groupes,
                groupsP: groupesPrincipaux,
                groupsS: groupesSecondaires,
            };
            //on valide les données avec Zod
            const parsed = user_schema_1.UserDatasIdentitySchema.safeParse(result);
            if (!parsed.success) {
                console.error("Validation Zod échouée :", parsed.error.errors);
                res.status(200).json({ message: "Données utilisateur invalides", reponse: false, result: "Données utilisateur invalides" });
                return;
            }
            res.status(200).json({
                message: "User récupéré avec succès",
                reponse: true,
                result: parsed.data,
            });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur schoolController, getUserIdentity", reponse: null, result: error });
            return;
        }
    }
    static async updateFamilyName(req, res) {
        const { userId, userFamilyName } = req.body;
        try {
            const result = await UserModel_1.default.updateFamilyName(userId, userFamilyName);
            if (result === 0) {
                res.status(400).json({ message: "noUpdateFamilyName", reponse: false, result: "noUpdateFamilyName" });
                return;
            }
            //on valide les données avec Zod
            const parsedResult = entierPositif_schema_1.EntierPositifSchema.safeParse(result);
            if (!parsedResult.success) {
                res.status(200).json({ message: "userId invalide", reponse: false, result: "userId invalide" });
                return;
            }
            res.status(200).json({ message: 'réussite', reponse: true, result: result });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur schoolController, getListGroupPrincipalBySchool", reponse: null, result: [] });
            return;
        }
    }
    static async updateFirstName(req, res) {
        const { userId, userFirstName } = req.body;
        try {
            const result = await UserModel_1.default.updateFirstName(userId, userFirstName);
            if (result === 0) {
                res.status(400).json({ message: "noUpdateFirstName", reponse: false, result: "noUpdateFirstName" });
                return;
            }
            //on valide les données avec Zod
            const parsedResult = entierPositif_schema_1.EntierPositifSchema.safeParse(result);
            if (!parsedResult.success) {
                res.status(200).json({ message: "userId invalide", reponse: false, result: "userId invalide" });
                return;
            }
            res.status(200).json({ message: 'réussite', reponse: true, result: result });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur schoolController, getListGroupPrincipalBySchool", reponse: null, result: [] });
            return;
        }
    }
    static async updateGrade(req, res) {
        const { userId, gradeId } = req.body;
        try {
            const result = await UserModel_1.default.updateGrade(userId, gradeId);
            if (result.userId === 0) {
                res.status(400).json({ message: "noUpdateGrade", reponse: false, result: "noUpdateGrade" });
                return;
            }
            //TODO
            //on valide les données avec Zod
            const parsedResult = entierPositif_schema_1.EntierPositifSchema.safeParse(result.userId);
            if (!parsedResult.success) {
                res.status(200).json({ message: "userId invalide", reponse: false, result: "userId invalide" });
                return;
            }
            res.status(200).json({ message: 'réussite', reponse: true, result: result });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur schoolController, getListGroupPrincipalBySchool", reponse: null, result: [] });
            return;
        }
    }
}
exports.default = SchoolController;
