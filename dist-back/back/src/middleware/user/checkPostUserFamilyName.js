"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPostUserFamilyName = void 0;
const stringName_schema_1 = require("@shared/schema/fields/stringName.schema");
const convertNomPropre_1 = __importDefault(require("../../../utils/convertNomPropre"));
const checkPostUserFamilyName = async (req, res, next) => {
    const { userFamilyName } = req.body;
    if (!userFamilyName) {
        res.status(401).json({ message: "userFamilyName manquant" });
        return;
    }
    const parsedRole = stringName_schema_1.StringNameSchema.safeParse(userFamilyName);
    if (!parsedRole.success) {
        res.status(400).json({ message: "userFamilyName invalide." });
        return;
    }
    const formattedName = (0, convertNomPropre_1.default)(userFamilyName);
    req.body.userFamilyName = formattedName;
    next(); // continuer si tout est OK
};
exports.checkPostUserFamilyName = checkPostUserFamilyName;
exports.default = exports.checkPostUserFamilyName;
