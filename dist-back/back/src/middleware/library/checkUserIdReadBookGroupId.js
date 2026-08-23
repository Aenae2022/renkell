"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserIdReadBookGroupId = void 0;
const LibraryModel_1 = __importDefault(require("@srcBack/model/LibraryModel"));
const checkUserIdReadBookGroupId = async (req, res, next) => {
    const { userId, bookGroupId } = req.body;
    if (!bookGroupId || bookGroupId === 0 || !userId || userId === 0) {
        res.status(400).json({ message: "Les données ne sont pas valides : userId, bookGroupId" });
        return;
    }
    const dataValid = await LibraryModel_1.default.doesUserIdReadBookGroupId(userId, bookGroupId);
    if (!dataValid) {
        res.status(404).json({ message: "Pas de corrélation userId, bookGroupId" });
        return;
    }
    next();
};
exports.checkUserIdReadBookGroupId = checkUserIdReadBookGroupId;
exports.default = exports.checkUserIdReadBookGroupId;
