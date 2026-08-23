"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LinkModel_1 = __importDefault(require("@srcBack/model/LinkModel"));
const UserModel_1 = __importDefault(require("@srcBack/model/UserModel"));
const mailService_1 = require("@srcBack/services/mailService");
class LinksController {
    static async getUserLinksListData(req, res) {
        const { userId } = req.body;
        try {
            const userListDatas = await LinkModel_1.default.getTeacherLinksListData(userId);
            if (userListDatas.reponse === null) {
                res.status(400).json({ message: userListDatas.message, reponse: null, result: [] });
                return;
            }
            res.status(200).json({ message: userListDatas.message, reponse: userListDatas.reponse, result: userListDatas.result });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
            return;
        }
    }
    static async getUserList(req, res) {
        const { userId, schoolId } = req.body;
        if (!schoolId) {
            res.status(200).json({ message: "utilisateur sans école", reponse: true, result: [] });
            return;
        }
        try {
            const userListDatas = await UserModel_1.default.getOthersTeacherList(userId, schoolId);
            if (userListDatas.reponse === null) {
                res.status(400).json({ message: userListDatas.message, reponse: null, result: [] });
                return;
            }
            if (userListDatas.result.length === 0) {
                res.status(200).json({ message: "pas d'autre utilisateur", reponse: false, result: [] });
                return;
            }
            res.status(200).json({ message: userListDatas.message, reponse: userListDatas.reponse, result: userListDatas.result });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
            return;
        }
    }
    static async globalLinksListByGroupStudent(req, res) {
        const { userId, groupId } = req.body;
        try {
            const groupListDatas = await LinkModel_1.default.getGroupLinksListData(userId, groupId);
            if (groupListDatas.reponse === null) {
                res.status(400).json({ message: groupListDatas.message, reponse: null, result: [] });
                return;
            }
            res.status(200).json({ message: groupListDatas.message, reponse: groupListDatas.reponse, result: groupListDatas.result });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
            return;
        }
    }
    static async linkAssociation(req, res) {
        const { refId, linkId, type, operation } = req.body;
        try {
            const associationWork = await LinkModel_1.default.associateLink({ refId, linkId, type, operation });
            if (!associationWork) {
                res.status(400).json({ message: "error", reponse: null, result: [] });
                return;
            }
            res.status(200).json({ message: associationWork.message, reponse: associationWork.reponse });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
            return;
        }
    }
    static async newLinkMail(req, res) {
        try {
            const { recipient, sender, subject, message } = req.body;
            //on récupère l'email de l'utilisateur
            const senderMail = await UserModel_1.default.getUserMailById(sender);
            if (!senderMail || senderMail.reponse === null || senderMail.result === "") {
                res.status(400).json({ message: "userParamsLinks.ask.error", reponse: null, result: [] });
                return;
            }
            //on envoie l'email
            const emailSent = await (0, mailService_1.sendEmail)({ recipient, sender: senderMail.result, subject, message });
            if (emailSent) {
                res.status(200).json({ result: true, message: "userParamsLinks.ask.success" });
            }
            else {
                res.status(500).json({ result: false, message: "userParamsLinks.ask.error" });
            }
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
            return;
        }
    }
}
exports.default = LinksController;
