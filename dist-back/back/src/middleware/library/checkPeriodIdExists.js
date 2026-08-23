"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPeriodIdExistsValid = void 0;
const entierPositif_schema_1 = require("@shared/schema/fields/entierPositif.schema");
const LibraryModel_1 = __importDefault(require("@srcBack/model/LibraryModel"));
const checkPeriodIdExistsValid = async (req, res, next) => {
    const { periodId } = req.body;
    if (periodId === undefined || periodId === null) {
        res.status(400).json({ message: "middleware checkPeriodLocationsValid : période manquante", });
        return;
    }
    //validation zod
    const parsePeriodId = entierPositif_schema_1.EntierPositifSchema.safeParse(periodId);
    if (!parsePeriodId.success) {
        res.status(400).json({
            message: "Middleware checkPeriodIdExists : Validation de la période échouée",
            errors: parsePeriodId.error.flatten().fieldErrors,
        });
        return;
    }
    const periodIdValid = await LibraryModel_1.default.doesPeriodExist(periodId);
    if (!periodIdValid) {
        res.status(400).json({
            message: "Middleware checkPeriodIdExists : Pas de période correspondante en bd",
        });
        return;
    }
    next();
};
exports.checkPeriodIdExistsValid = checkPeriodIdExistsValid;
exports.default = exports.checkPeriodIdExistsValid;
