"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkGroupIdPostExists = void 0;
const GroupModel_1 = __importDefault(require("@srcBack/model/GroupModel"));
const entierPositif_schema_1 = require("@shared/schema/fields/entierPositif.schema");
const checkGroupIdPostExists = async (req, res, next) => {
    const { groupId } = req.body;
    if (!groupId) {
        res.status(400).json({ message: "L'objet groupId est manquant." });
        return;
    }
    // ✅ Validation avec Zod
    const result = entierPositif_schema_1.EntierPositifSchema.safeParse(groupId);
    if (!result.success) {
        res.status(400).json({
            message: "Validation du group échouée",
            errors: result.error.flatten().fieldErrors,
        });
        return;
    }
    // 🧼 On travaille maintenant avec les données validées
    const validatedGroupId = result.data;
    req.body.groupId = validatedGroupId;
    const groupIdExists = await GroupModel_1.default.doesGroupIdExist(validatedGroupId);
    if (!groupIdExists) {
        res.status(404).json({ message: "salle de classe introuvable" });
        return;
    }
    next();
};
exports.checkGroupIdPostExists = checkGroupIdPostExists;
exports.default = exports.checkGroupIdPostExists;
