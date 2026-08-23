"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DegemerController = void 0;
const SchoolModel_1 = __importDefault(require("../model/SchoolModel"));
const ClassroomModel_1 = __importDefault(require("../model/ClassroomModel"));
const UserModel_1 = __importDefault(require("../model/UserModel"));
class DegemerController {
    static async getClassroomsList(req, res) {
        const { schoolRef } = req.body;
        try {
            const classroomsList = await SchoolModel_1.default.getClassroomsListByRef(schoolRef);
            if (classroomsList.reponse === null) {
                res.status(400).json({ message: classroomsList.message, reponse: null, result: [] });
                return;
            }
            res.status(200).json({ message: classroomsList.message, reponse: classroomsList.reponse, result: classroomsList.result });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
            return;
        }
    }
    static async getClassroomLinksList(req, res) {
        const { classroomRef } = req.body;
        try {
            const linksList = await ClassroomModel_1.default.getClassroomLinksListByRef(classroomRef);
            if (linksList.reponse === null) {
                res.status(400).json({ message: linksList.message, reponse: null, result: [] });
                return;
            }
            res.status(200).json({ message: linksList.message, reponse: linksList.reponse, result: linksList.result });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
            return;
        }
    }
    static async getUserLinksList(req, res) {
        const { userPseudo } = req.body;
        try {
            const linksList = await UserModel_1.default.getUserLinksListByUserPseudo(userPseudo);
            if (linksList.reponse === null) {
                res.status(400).json({ message: linksList.message, reponse: null, result: [] });
                return;
            }
            res.status(200).json({ message: linksList.message, reponse: linksList.reponse, result: linksList.result });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
            return;
        }
    }
}
exports.DegemerController = DegemerController;
exports.default = DegemerController;
