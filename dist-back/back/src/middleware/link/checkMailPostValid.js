"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMailPostValid = void 0;
const mail_schema_1 = require("@shared/schema/mail.schema");
const xss_1 = __importDefault(require("xss"));
const UserModel_1 = __importDefault(require("@srcBack/model/UserModel"));
const checkMailPostValid = async (req, res, next) => {
    const parseResult = mail_schema_1.MailSchema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(400).json({
            message: 'Invalid email data',
            issues: parseResult.error.format(),
        });
        return;
    }
    //vérification du userId
    const userValid = await UserModel_1.default.doesUserIdExist(req.body.sender);
    if (!userValid) {
        res.status(400).json({ message: "Utilisateur introuvable." });
        return;
    }
    const sanitized = {
        ...parseResult.data,
        subject: (0, xss_1.default)(parseResult.data.subject),
        message: (0, xss_1.default)(parseResult.data.message),
    };
    req.body = sanitized;
    next();
};
exports.checkMailPostValid = checkMailPostValid;
