"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkGradePostValid = void 0;
const entierPositif_schema_1 = require("@shared/schema/fields/entierPositif.schema");
const GradeModel_1 = __importDefault(require("@srcBack/model/GradeModel"));
const checkGradePostValid = async (req, res, next) => {
    const { gradeId } = req.body;
    if (!gradeId) {
        res.status(401).json({ message: "gradeId manquant" });
        return;
    }
    const parsedRole = entierPositif_schema_1.EntierPositifSchema.safeParse(gradeId);
    if (!parsedRole.success) {
        res.status(400).json({ message: "gradeId invalide." });
        return;
    }
    const gradeValid = await GradeModel_1.default.doesGradeIdExist(gradeId);
    if (!gradeValid) {
        res.status(400).json({ message: "gradeId inexistant." });
        return;
    }
    next(); // continuer si tout est OK
};
exports.checkGradePostValid = checkGradePostValid;
exports.default = exports.checkGradePostValid;
