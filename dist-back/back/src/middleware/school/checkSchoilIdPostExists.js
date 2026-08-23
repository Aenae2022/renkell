"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSchoolIdPostSpeExists = void 0;
const SchoolModel_1 = __importDefault(require("@srcBack/model/SchoolModel"));
const checkSchoolIdPostSpeExists = async (req, res, next) => {
    const { schoolId } = req.body;
    if (schoolId && isNaN(schoolId)) {
        res.status(403).json({ message: "Accès interdit." });
        return;
    }
    if (schoolId) {
        const schoolIdExists = await SchoolModel_1.default.doesSchoolIdExist(schoolId);
        if (!schoolIdExists) {
            res.status(404).json({ message: "école introuvable" });
            return;
        }
    }
    next();
};
exports.checkSchoolIdPostSpeExists = checkSchoolIdPostSpeExists;
