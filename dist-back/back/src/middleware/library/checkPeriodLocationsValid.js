"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPeriodLocationsValid = void 0;
const library_schema_1 = require("@shared/schema/library.schema");
const LibraryModel_1 = __importDefault(require("@srcBack/model/LibraryModel"));
const checkPeriodLocationsValid = async (req, res, next) => {
    const { period, locations } = req.body;
    if (period === undefined || period === null) {
        res.status(400).json({ message: "middleware checkPeriodLocationsValid : période manquante", });
        return;
    }
    if (locations === undefined || locations === null) {
        res.status(400).json({ message: "middleware checkPeriodLocationsValid : locations manquants" });
        return;
    }
    //validation zod
    const parsePeriod = library_schema_1.PeriodSchema.safeParse(period);
    if (!parsePeriod.success) {
        res.status(400).json({
            message: "Middleware checkPeriodLocationsValid : Validation de la période échouée",
            errors: parsePeriod.error.flatten().fieldErrors,
        });
        return;
    }
    const periodValid = await LibraryModel_1.default.doesPeriodExist(period.periodId);
    if (!periodValid) {
        res.status(400).json({
            message: "Middleware checkPeriodLocationsValid : Pas de période correspondante en bd",
        });
        return;
    }
    const parseLocations = library_schema_1.LocationsSchema.safeParse(locations);
    if (!parseLocations.success) {
        res.status(400).json({
            message: "Middleware checkPeriodLocationsValid : Validation des locations échouée",
            errors: parseLocations.error.flatten().fieldErrors,
        });
        return;
    }
    next();
};
exports.checkPeriodLocationsValid = checkPeriodLocationsValid;
exports.default = exports.checkPeriodLocationsValid;
