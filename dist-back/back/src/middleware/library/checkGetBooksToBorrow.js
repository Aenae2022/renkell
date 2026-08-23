"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkGetBooksToBorrow = void 0;
const UserModel_1 = __importDefault(require("@srcBack/model/UserModel"));
const checkGetBooksToBorrow = async (req, res, next) => {
    const { groupId, userId, waiting } = req.body;
    if (!groupId || groupId === 0 || !userId || userId === 0 || typeof waiting !== "boolean") {
        return res.status(400).json({ message: "Les données ne sont pas valides : groupId, userId, waiting" });
    }
    //vérification des format de données
    const groupIdValid = Number.isInteger(groupId) && groupId > 0;
    const userIdValid = Number.isInteger(userId) && userId > 0;
    if (!groupIdValid || !userIdValid) {
        return res.status(400).json({ message: "Les données ne sont pas valides : groupId, userId" });
    }
    const groupUserValid = await UserModel_1.default.doesUserIdExistInGroupId(userId, groupId);
    if (!groupUserValid) {
        return res.status(404).json({ message: "Pas de corrélation userId, groupId" });
    }
    next();
};
exports.checkGetBooksToBorrow = checkGetBooksToBorrow;
exports.default = exports.checkGetBooksToBorrow;
