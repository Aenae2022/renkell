"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPostUserFirstName = void 0;
const stringName_schema_1 = require("@shared/schema/fields/stringName.schema");
const convertNomPropre_1 = __importDefault(require("../../../utils/convertNomPropre"));
const checkPostUserFirstName = async (req, res, next) => {
    const { userFirstName } = req.body;
    if (!userFirstName) {
        res.status(401).json({ message: "userFirstName manquant" });
        return;
    }
    const parsedRole = stringName_schema_1.StringNameSchema.safeParse(userFirstName);
    if (!parsedRole.success) {
        res.status(400).json({ message: "userFirstName invalide." });
        return;
    }
    const formattedName = (0, convertNomPropre_1.default)(userFirstName);
    req.body.userFirstName = formattedName;
    next(); // continuer si tout est OK
};
exports.checkPostUserFirstName = checkPostUserFirstName;
exports.default = exports.checkPostUserFirstName;
