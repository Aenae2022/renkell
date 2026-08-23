"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLinkAssociationPostValid = void 0;
const zod_1 = __importDefault(require("zod"));
const GroupModel_1 = __importDefault(require("@srcBack/model/GroupModel"));
const UserModel_1 = __importDefault(require("@srcBack/model/UserModel"));
const checkLinkAssociationPostValid = async (req, res, next) => {
    const { refId, linkId, type, operation } = req.body;
    if (!refId || !linkId || !type || !operation) {
        res.status(400).json({ message: "Les paramètres refId, linkId, type et operation sont requis." });
        return;
    }
    // ✅ Validation des données envoyées avec Zod
    const zRefId = zod_1.default.number().safeParse(refId);
    const zLinkId = zod_1.default.number().safeParse(linkId);
    const zType = zod_1.default.enum(["group", "user"]).safeParse(type);
    const zOperation = zod_1.default.enum(["addAssociation", "removeAssociation"]).safeParse(operation);
    if (!zRefId.success || !zLinkId.success || !zType.success || !zOperation.success) {
        res.status(400).json({
            message: "Validation des paramètres échouée",
            errors: {
                refId: zRefId.error?.flatten().fieldErrors,
                linkId: zLinkId.error?.flatten().fieldErrors,
                type: zType.error?.flatten().fieldErrors,
                operation: zOperation.error?.flatten().fieldErrors,
            },
        });
        return;
    }
    // 🧼 On travaille maintenant avec les données validées
    const vRefId = zRefId.data;
    const vLinkId = zLinkId.data;
    const vType = zType.data;
    const vOperation = zOperation.data;
    req.body.refId = vRefId;
    req.body.linkId = vLinkId;
    req.body.type = vType;
    req.body.operation = vOperation;
    //vérification des données en base de données
    if (vType === "group") {
        const groupIdExists = await GroupModel_1.default.doesGroupIdExist(vRefId);
        if (!groupIdExists) {
            res.status(404).json({ message: "salle de classe introuvable" });
            return;
        }
    }
    if (vType === "user") {
        const userIdExists = await UserModel_1.default.doesUserIdExist(vRefId);
        if (!userIdExists) {
            res.status(404).json({ message: "utilisateur introuvable" });
            return;
        }
    }
    next();
};
exports.checkLinkAssociationPostValid = checkLinkAssociationPostValid;
