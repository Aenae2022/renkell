"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserIdPostStudentValid = exports.checkUserIdPostValid = void 0;
exports.checkUserIdValid = checkUserIdValid;
const user_schema_1 = require("@shared/schema/user.schema");
const UserModel_1 = __importDefault(require("@srcBack/model/UserModel"));
function checkUserIdValid() {
    return async (req, res, next) => {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "Non authentifié." });
            return;
        }
        const parsedUser = user_schema_1.UserSessionConnectSchema.safeParse(user);
        if (!parsedUser.success) {
            res.status(400).json({ message: "Utilisateur invalide." });
            return;
        }
        req.user = parsedUser.data;
        const userValid = await UserModel_1.default.doesUserIdExist(user.userId);
        if (!userValid) {
            res.status(400).json({ message: "Utilisateur introuvable." });
            return;
        }
        next(); // continuer si tout est OK
    };
}
const checkUserIdPostValid = () => {
    return async (req, res, next) => {
        const { userId } = req.body;
        if (!userId) {
            res.status(401).json({ message: "Non authentifié. middleware checkUserIdPostValid" });
            return;
        }
        const userValid = await UserModel_1.default.doesUserIdExist(userId);
        if (!userValid) {
            res.status(400).json({ message: "Utilisateur introuvable. middleware checkUserIdPostValid" });
            return;
        }
        next(); // continuer si tout est OK
    };
};
exports.checkUserIdPostValid = checkUserIdPostValid;
const checkUserIdPostStudentValid = () => {
    return async (req, res, next) => {
        const { userId } = req.body;
        if (!userId) {
            res.status(401).json({ message: "Non authentifié." });
            return;
        }
        const userValid = await UserModel_1.default.doesUserIdStudentExist(userId);
        if (!userValid) {
            res.status(400).json({ message: "Utilisateur introuvable." });
            return;
        }
        next(); // continuer si tout est OK
    };
};
exports.checkUserIdPostStudentValid = checkUserIdPostStudentValid;
