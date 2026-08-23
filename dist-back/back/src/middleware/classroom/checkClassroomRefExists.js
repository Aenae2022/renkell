"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkClassroomRefExists = void 0;
const ClassroomModel_1 = __importDefault(require("../../model/ClassroomModel"));
const classroom_schema_1 = require("@shared/schema/classroom.schema");
const checkClassroomRefExists = async (req, res, next) => {
    const { classroomRef } = req.body;
    if (!classroomRef) {
        res.status(400).json({ message: "L'objet classroomRef est manquant." });
        return;
    }
    // ✅ Validation avec Zod
    const result = classroom_schema_1.ClassroomRefSchema.safeParse(classroomRef);
    if (!result.success) {
        res.status(400).json({
            message: "Validation de la salle de classe échouée",
            errors: result.error.flatten().fieldErrors,
        });
        return;
    }
    // 🧼 On travaille maintenant avec les données validées
    const validatedClassroomRef = result.data;
    req.body.classroomRef = validatedClassroomRef;
    const classroomRefExists = await ClassroomModel_1.default.doesClassroomRefExist(validatedClassroomRef);
    if (!classroomRefExists) {
        res.status(404).json({ message: "salle de classe introuvable" });
        return;
    }
    next();
};
exports.checkClassroomRefExists = checkClassroomRefExists;
exports.default = exports.checkClassroomRefExists;
