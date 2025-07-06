import {z} from 'zod'
import { StringNameSchema } from './fields/stringName.schema'
import { StringShortRefSchema } from './fields/stringShortRef.schema'
import { StringNameTitleSchema } from './fields/stringNameTitle.schema'
import { EntierPositifSchema } from './fields/entierPositif.schema'
import { StringNameGroupSchema } from './fields/stringNameGroup.schema'

export const StudentLibrarySchema = z.object({
  userId: z.number().int(),
  userFamilyName: StringNameSchema,
  userFirstName: StringNameSchema,
  grade: StringShortRefSchema,
  typeEvent: z.string().nullable()
})

export const BookSchema = z.object({
  bookGroupId: EntierPositifSchema,
  bookId: EntierPositifSchema,
  bookTitle: StringNameTitleSchema,
  bookAuthor: StringNameSchema.nullable().optional(),
  bookPublisher: StringNameSchema.nullable().optional(),
  bookIsbn: z.string().nullable().optional(),
  bookLocation : z.enum(["med", "sch", "roo", "per"]),
  bookReservation: z.boolean().nullable().optional()
})

export const BookMiniSchema = z.object({
  bookId: EntierPositifSchema,
  bookTitle: StringNameTitleSchema,
  bookAuthor: StringNameSchema.nullable().optional(),
  bookPublisher: StringNameSchema.nullable().optional(),
  bookIsbn: z.string().nullable().optional(),
})

export const BookStatSchema = z.object({
  bookId: EntierPositifSchema,
  bookTitle: StringNameTitleSchema,
  bookAuthor: StringNameSchema.nullable().optional(),
  bookPublisher: StringNameSchema.nullable().optional(),
  statsReading : z.object({
    total: EntierPositifSchema,
    concerned: z.string(),
  }),
  statsBorrow : z.object({
    total: EntierPositifSchema,
    concerned: z.string(),
  }),
  statsReaded : z.object({
    total: EntierPositifSchema,
    concerned: z.string(),
  }),
  statsReserved : z.object({
    total: EntierPositifSchema,
    concerned: z.string(),
  }),
})


export const BookReadingSchema = z.object({
  bookGroupId: EntierPositifSchema,
  bookId: EntierPositifSchema,
  bookTitle: StringNameTitleSchema,
  bookAuthor: StringNameSchema.nullable().optional(),
  bookPublisher: StringNameSchema.nullable().optional(),
  bookIsbn: z.string().nullable().optional(),
  bookLocation : z.enum(["med", "sch", "roo", "per"]),
  bookReservation: z.boolean().nullable().optional(),
  numberReaded: z.number().int(),
  waitingList: z.string().min(0).max(100),
})

export const BookWaitingSchema = z.object({
 bookGroupId: EntierPositifSchema,
  bookId: EntierPositifSchema,
  bookTitle: StringNameTitleSchema,
  bookAuthor: StringNameSchema.nullable().optional(),
  bookPublisher: StringNameTitleSchema.nullable().optional(),
  bookIsbn: z.string().nullable().optional(),
  bookLocation : z.enum(["med", "sch", "roo", "per"]),
  bookReservation: z.boolean().nullable().optional(),
  numberReaded: z.number().int(),
  waitingList: z.string(),
  enableToBorrow: z.boolean().optional(),
  waitingListPlace: z.number().int().nullable(),
  actualReader: z.preprocess((val) => (val === "" ? null : val),StringNameSchema.nullable()),
})

export const BookToGroupListSchema = z.object({
    bookId: EntierPositifSchema,
    bookTitle: StringNameTitleSchema,
    bookAuthor: z.preprocess((val) => (val === "" ? null : val), StringNameSchema.nullable().optional()),
    bookPublisher: StringNameTitleSchema.nullable().optional(),
    bookIsbn: z.string().nullable().optional(),
    bookLocation : z.enum(["med", "sch", "roo", "per"]),
    userId: EntierPositifSchema,
    groupId: EntierPositifSchema,
    nbBook: EntierPositifSchema,
})

export const BookLibraryShortSchema = z.object({
  bookId: EntierPositifSchema,
  bookTitle: StringNameTitleSchema,
  bookAuthor: StringNameSchema.nullable().optional(),
  bookPublisher: StringNameSchema.nullable().optional(),
  bookIsbn: z.string().nullable().optional(),
  isOfficial: z.boolean().optional()
})

export const bookLocationSchema = z.enum(["med", "sch", "roo", "per"])

export const PeriodSchema = z.object({
  periodId: EntierPositifSchema,
  periodType: z.union([
  z.number(),
  z.enum(["a", "p"])
]),
  periodName: StringNameGroupSchema,
  periodStart: z.coerce.date(),
  periodEnd: z.coerce.date(),
})
.refine((data) => data.periodStart < data.periodEnd, {
  message : "errorDates",
  path: ["periodEnd"]
});

export const BookStatsDatasSchema = z.object({ 
  bookId: EntierPositifSchema,
  bookGroupId: EntierPositifSchema,
  bookTitle: StringNameTitleSchema,
  bookAuthor: StringNameSchema.nullable().optional(),
  bookPublisher: StringNameSchema.nullable().optional(),
  bookIsbn: z.string().nullable().optional(),
  nbBorrow: z.object({
    total: z.number(),
    concerned: z.string(),
  }),
  nbRead: z.object({
    total: z.number(),
    concerned: z.string(),
  }),
  studentReading: z.string(),
});

export const StudentStatsSchema = z.object({
  userId: z.number().int(),
  userFamilyName: StringNameSchema,
  userFirstName: StringNameSchema,
  grade: StringNameSchema,
  groupId: z.number().int().nullable(),
  nbReaded: z.object({
    total: z.number(),
    concerned: z.string(),
  }),
  nbDistinctReaded: z.object({
    total: z.number(),
    concerned: z.string(),
  }),
  nbNoReaded: z.object({
    total: z.number(),
    concerned: z.string(),
  }),
});

export const LocationsSchema = z.tuple([
  z.enum(["med", ""]),
  z.enum(["sch", ""]),
  z.enum(["roo", ""]),
  z.enum(["per", ""]),]
)

export type StudentLibraryType = z.infer<typeof StudentLibrarySchema>
export type BookType = z.infer<typeof BookSchema>
export type BookReadingType = z.infer<typeof BookReadingSchema>
export type BookWaitingType = z.infer<typeof BookWaitingSchema>
export type BookToGroupListType = z.infer<typeof BookToGroupListSchema>
export type BookLibraryShortType = z.infer<typeof BookLibraryShortSchema>
export type BookLocationType = z.infer<typeof bookLocationSchema>
export type PeriodType = z.infer<typeof PeriodSchema>
export type BookStatsDatasType = z.infer<typeof BookStatsDatasSchema>
export type StudentStatsType = z.infer<typeof StudentStatsSchema>
export type LocationsType = z.infer<typeof LocationsSchema>
export type BookMiniType = z.infer<typeof BookMiniSchema>
export type BookStatType = z.infer<typeof BookStatSchema>