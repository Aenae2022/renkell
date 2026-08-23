"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPostRoleValid = void 0;
const role_schema_1 = require("@shared/schema/role.schema");
const UserModel_1 = __importDefault(require("@srcBack/model/UserModel"));
const checkPostRoleValid = async (req, res, next) => {
    const { role } = req.body;
    if (!role) {
        res.status(401).json({ message: "Non authentifié." });
        return;
    }
    const parsedRole = role_schema_1.UserRoleSchema.safeParse(role);
    if (!parsedRole.success) {
        res.status(400).json({ message: "Role invalide." });
        return;
    }
    req.body = parsedRole.data;
    const roleValid = await UserModel_1.default.doesRoleExist(role);
    if (!roleValid) {
        res.status(400).json({ message: "Role introuvable." });
        return;
    }
    next(); // continuer si tout est OK
};
exports.checkPostRoleValid = checkPostRoleValid;
