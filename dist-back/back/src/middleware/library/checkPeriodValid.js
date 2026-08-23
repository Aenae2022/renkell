"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPeriodValid = void 0;
const library_schema_1 = require("@shared/schema/library.schema");
const LibraryModel_1 = __importDefault(require("@srcBack/model/LibraryModel"));
const checkPeriodValid = async (req, res, next) => {
    const { period } = req.body;
    if (period === undefined || period === null) {
        res.status(400).json({ message: "middleware checkPeriodValid : période manquante", });
        return;
    }
    //validation zod
    const parsePeriod = library_schema_1.PeriodSchema.safeParse(period);
    if (!parsePeriod.success) {
        res.status(400).json({
            message: "Middleware checkPeriodValid : Validation de la période échouée",
            errors: parsePeriod.error.flatten().fieldErrors,
        });
        return;
    }
    const periodValid = await LibraryModel_1.default.doesPeriodExist(period.periodId);
    if (!periodValid) {
        res.status(400).json({
            message: "Middleware checkPeriodValid : Pas de période correspondante en bd",
        });
        return;
    }
    next();
};
exports.checkPeriodValid = checkPeriodValid;
exports.default = exports.checkPeriodValid;
