"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDomaineExists = void 0;
const stringNameGroup_schema_1 = require("@shared/schema/fields/stringNameGroup.schema");
const DomaineModel_1 = __importDefault(require("@srcBack/model/DomaineModel"));
const checkDomaineExists = async (req, res, next) => {
    const { domaine } = req.body;
    if (!domaine) {
        res.status(400).json({ message: "L'objet domaine est manquant." });
        return;
    }
    // ✅ Validation avec Zod
    const result = stringNameGroup_schema_1.StringNameGroupSchema.safeParse(domaine);
    if (!result.success) {
        res.status(400).json({
            message: "Validation ZOD du domaine échouée",
            errors: result.error.flatten().fieldErrors,
        });
        return;
    }
    const domaineExists = await DomaineModel_1.default.doesDomaineExist(domaine);
    if (!domaineExists) {
        res.status(404).json({ message: "domaine introuvable" });
        return;
    }
    next();
};
exports.checkDomaineExists = checkDomaineExists;
exports.default = exports.checkDomaineExists;
