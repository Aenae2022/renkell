"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSousDomaineExists = void 0;
const stringNameGroup_schema_1 = require("@shared/schema/fields/stringNameGroup.schema");
const SousDomaineModel_1 = __importDefault(require("@srcBack/model/SousDomaineModel"));
const checkSousDomaineExists = async (req, res, next) => {
    const { sousDomaine } = req.body;
    if (!sousDomaine) {
        res.status(400).json({ message: "L'objet sous-domaine est manquant." });
        return;
    }
    // ✅ Validation avec Zod
    const result = stringNameGroup_schema_1.StringNameGroupSchema.safeParse(sousDomaine);
    if (!result.success) {
        res.status(400).json({
            message: "Validation ZOD du sous-domaine échouée",
            errors: result.error.flatten().fieldErrors,
        });
        return;
    }
    const sousDomaineExists = await SousDomaineModel_1.default.doesSousDomaineExist(sousDomaine);
    if (!sousDomaineExists) {
        res.status(404).json({ message: "sous-domaine introuvable" });
        return;
    }
    next();
};
exports.checkSousDomaineExists = checkSousDomaineExists;
exports.default = exports.checkSousDomaineExists;
