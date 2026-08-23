"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsSchema = exports.StudentStatsSchema = exports.BookStatsDatasSchema = exports.PeriodSchema = exports.bookLocationSchema = exports.BookLibraryShortSchema = exports.BookToGroupListSchema = exports.BookWaitingSchema = exports.BookReadingSchema = exports.BookStatSchema = exports.BookMiniSchema = exports.BookSchema = exports.StudentLibrarySchema = void 0;
const zod_1 = require("zod");
const stringName_schema_1 = require("./fields/stringName.schema");
const stringShortRef_schema_1 = require("./fields/stringShortRef.schema");
const stringNameTitle_schema_1 = require("./fields/stringNameTitle.schema");
const entierPositif_schema_1 = require("./fields/entierPositif.schema");
const stringNameGroup_schema_1 = require("./fields/stringNameGroup.schema");
exports.StudentLibrarySchema = zod_1.z.object({
    userId: zod_1.z.number().int(),
    userFamilyName: stringName_schema_1.StringNameSchema,
    userFirstName: stringName_schema_1.StringNameSchema,
    grade: stringShortRef_schema_1.StringShortRefSchema,
    typeEvent: zod_1.z.string().nullable()
});
exports.BookSchema = zod_1.z.object({
    bookGroupId: entierPositif_schema_1.EntierPositifSchema,
    bookId: entierPositif_schema_1.EntierPositifSchema,
    bookTitle: stringNameTitle_schema_1.StringNameTitleSchema,
    bookAuthor: stringName_schema_1.StringNameSchema.nullable().optional(),
    bookPublisher: stringName_schema_1.StringNameSchema.nullable().optional(),
    bookIsbn: zod_1.z.string().nullable().optional(),
    bookLocation: zod_1.z.enum(["med", "sch", "roo", "per"]),
    bookReservation: zod_1.z.boolean().nullable().optional()
});
exports.BookMiniSchema = zod_1.z.object({
    bookId: entierPositif_schema_1.EntierPositifSchema,
    bookTitle: stringNameTitle_schema_1.StringNameTitleSchema,
    bookAuthor: stringName_schema_1.StringNameSchema.nullable().optional(),
    bookPublisher: stringName_schema_1.StringNameSchema.nullable().optional(),
    bookIsbn: zod_1.z.string().nullable().optional(),
});
exports.BookStatSchema = zod_1.z.object({
    bookId: entierPositif_schema_1.EntierPositifSchema,
    bookTitle: stringNameTitle_schema_1.StringNameTitleSchema,
    bookAuthor: stringName_schema_1.StringNameSchema.nullable().optional(),
    bookPublisher: stringName_schema_1.StringNameSchema.nullable().optional(),
    statsReading: zod_1.z.object({
        total: entierPositif_schema_1.EntierPositifSchema,
        concerned: zod_1.z.string(),
    }),
    statsBorrow: zod_1.z.object({
        total: entierPositif_schema_1.EntierPositifSchema,
        concerned: zod_1.z.string(),
    }),
    statsReaded: zod_1.z.object({
        total: entierPositif_schema_1.EntierPositifSchema,
        concerned: zod_1.z.string(),
    }),
    statsReserved: zod_1.z.object({
        total: entierPositif_schema_1.EntierPositifSchema,
        concerned: zod_1.z.string(),
    }),
});
exports.BookReadingSchema = zod_1.z.object({
    bookGroupId: entierPositif_schema_1.EntierPositifSchema,
    bookId: entierPositif_schema_1.EntierPositifSchema,
    bookTitle: stringNameTitle_schema_1.StringNameTitleSchema,
    bookAuthor: stringName_schema_1.StringNameSchema.nullable().optional(),
    bookPublisher: stringName_schema_1.StringNameSchema.nullable().optional(),
    bookIsbn: zod_1.z.string().nullable().optional(),
    bookLocation: zod_1.z.enum(["med", "sch", "roo", "per"]),
    bookReservation: zod_1.z.boolean().nullable().optional(),
    numberReaded: zod_1.z.number().int(),
    waitingList: zod_1.z.string().min(0).max(100),
});
exports.BookWaitingSchema = zod_1.z.object({
    bookGroupId: entierPositif_schema_1.EntierPositifSchema,
    bookId: entierPositif_schema_1.EntierPositifSchema,
    bookTitle: stringNameTitle_schema_1.StringNameTitleSchema,
    bookAuthor: stringName_schema_1.StringNameSchema.nullable().optional(),
    bookPublisher: stringNameTitle_schema_1.StringNameTitleSchema.nullable().optional(),
    bookIsbn: zod_1.z.string().nullable().optional(),
    bookLocation: zod_1.z.enum(["med", "sch", "roo", "per"]),
    bookReservation: zod_1.z.boolean().nullable().optional(),
    numberReaded: zod_1.z.number().int(),
    waitingList: zod_1.z.string(),
    enableToBorrow: zod_1.z.boolean().optional(),
    waitingListPlace: zod_1.z.number().int().nullable(),
    actualReader: zod_1.z.preprocess((val) => (val === "" ? null : val), stringName_schema_1.StringNameSchema.nullable()),
});
exports.BookToGroupListSchema = zod_1.z.object({
    bookId: entierPositif_schema_1.EntierPositifSchema,
    bookTitle: stringNameTitle_schema_1.StringNameTitleSchema,
    bookAuthor: zod_1.z.preprocess((val) => (val === "" ? null : val), stringName_schema_1.StringNameSchema.nullable().optional()),
    bookPublisher: stringNameTitle_schema_1.StringNameTitleSchema.nullable().optional(),
    bookIsbn: zod_1.z.string().nullable().optional(),
    bookLocation: zod_1.z.enum(["med", "sch", "roo", "per"]),
    userId: entierPositif_schema_1.EntierPositifSchema,
    groupId: entierPositif_schema_1.EntierPositifSchema,
    nbBook: entierPositif_schema_1.EntierPositifSchema,
});
exports.BookLibraryShortSchema = zod_1.z.object({
    bookId: entierPositif_schema_1.EntierPositifSchema,
    bookTitle: stringNameTitle_schema_1.StringNameTitleSchema,
    bookAuthor: stringName_schema_1.StringNameSchema.nullable().optional(),
    bookPublisher: stringName_schema_1.StringNameSchema.nullable().optional(),
    bookIsbn: zod_1.z.string().nullable().optional(),
    isOfficial: zod_1.z.boolean().optional()
});
exports.bookLocationSchema = zod_1.z.enum(["med", "sch", "roo", "per"]);
exports.PeriodSchema = zod_1.z.object({
    periodId: entierPositif_schema_1.EntierPositifSchema,
    periodType: zod_1.z.union([
        zod_1.z.number(),
        zod_1.z.enum(["a", "p"])
    ]),
    periodName: stringNameGroup_schema_1.StringNameGroupSchema,
    periodStart: zod_1.z.coerce.date(),
    periodEnd: zod_1.z.coerce.date(),
})
    .refine((data) => data.periodStart < data.periodEnd, {
    message: "errorDates",
    path: ["periodEnd"]
});
exports.BookStatsDatasSchema = zod_1.z.object({
    bookId: entierPositif_schema_1.EntierPositifSchema,
    bookGroupId: entierPositif_schema_1.EntierPositifSchema,
    bookTitle: stringNameTitle_schema_1.StringNameTitleSchema,
    bookAuthor: stringName_schema_1.StringNameSchema.nullable().optional(),
    bookPublisher: stringName_schema_1.StringNameSchema.nullable().optional(),
    bookIsbn: zod_1.z.string().nullable().optional(),
    nbBorrow: zod_1.z.object({
        total: zod_1.z.number(),
        concerned: zod_1.z.string(),
    }),
    nbRead: zod_1.z.object({
        total: zod_1.z.number(),
        concerned: zod_1.z.string(),
    }),
    studentReading: zod_1.z.string(),
});
exports.StudentStatsSchema = zod_1.z.object({
    userId: zod_1.z.number().int(),
    userFamilyName: stringName_schema_1.StringNameSchema,
    userFirstName: stringName_schema_1.StringNameSchema,
    grade: stringName_schema_1.StringNameSchema,
    groupId: zod_1.z.number().int().nullable(),
    nbReaded: zod_1.z.object({
        total: zod_1.z.number(),
        concerned: zod_1.z.string(),
    }),
    nbDistinctReaded: zod_1.z.object({
        total: zod_1.z.number(),
        concerned: zod_1.z.string(),
    }),
    nbNoReaded: zod_1.z.object({
        total: zod_1.z.number(),
        concerned: zod_1.z.string(),
    }),
});
exports.LocationsSchema = zod_1.z.tuple([
    zod_1.z.enum(["med", ""]),
    zod_1.z.enum(["sch", ""]),
    zod_1.z.enum(["roo", ""]),
    zod_1.z.enum(["per", ""]),
]);
