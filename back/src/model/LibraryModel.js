"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var library_schema_1 = require("@shared/schema/library.schema");
var client_1 = require("../lib/prisma/client");
var LibraryModel = /** @class */ (function () {
    function LibraryModel() {
    }
    LibraryModel.doesBookIdExist = function (bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var book, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.book.findUnique({
                                where: { bookId: bookId },
                                select: { bookId: true },
                            })];
                    case 1:
                        book = _a.sent();
                        return [2 /*return*/, !!book];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Erreur Prisma :", error_1);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LibraryModel.doesBookGroupIdExist = function (bookGroupId) {
        return __awaiter(this, void 0, void 0, function () {
            var bookGroup, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookGroup.findUnique({
                                where: { bookGroupId: bookGroupId },
                                select: { bookGroupId: true },
                            })];
                    case 1:
                        bookGroup = _a.sent();
                        return [2 /*return*/, !!bookGroup];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Erreur Prisma :", error_2);
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LibraryModel.doesPeriodExist = function (periodId) {
        return __awaiter(this, void 0, void 0, function () {
            var search, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.periodlibrary.findUnique({
                                where: { periodId: periodId },
                                select: { periodId: true },
                            })];
                    case 1:
                        search = _a.sent();
                        return [2 /*return*/, !!search];
                    case 2:
                        error_3 = _a.sent();
                        console.error("Erreur Prisma :", error_3);
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //savoir si un userId lit un bookGroupId
    //return bool
    LibraryModel.doesUserIdReadBookGroupId = function (userId, bookGroupId) {
        return __awaiter(this, void 0, void 0, function () {
            var valid, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookEvent.findFirst({
                                where: {
                                    userId: userId,
                                    bookGroupId: bookGroupId,
                                    bookEventType: 1,
                                },
                                select: {
                                    userId: true,
                                },
                            })];
                    case 1:
                        valid = _a.sent();
                        return [2 /*return*/, !!valid];
                    case 2:
                        error_4 = _a.sent();
                        console.error("Erreur Prisma :", error_4);
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //savoir qui est l'emprunteur actuel d'un livre
    //return {message:string, reponse :bool, result : {userId, userName: results[0]['first_name'] + " " + results[0]['family_name']                 
    LibraryModel.getActualBookBorrower = function (bookGroupId) {
        return __awaiter(this, void 0, void 0, function () {
            var bookBorrower, student, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookEvent.findFirst({
                                where: {
                                    bookGroupId: bookGroupId,
                                    bookEventType: 1,
                                },
                                select: {
                                    user: {
                                        select: {
                                            userFirstName: true,
                                            userFamilyName: true,
                                            userId: true,
                                            grade: {
                                                select: {
                                                    gradeName: true,
                                                },
                                            },
                                        }
                                    },
                                    bookEventType: true,
                                }
                            })];
                    case 1:
                        bookBorrower = _a.sent();
                        if (!bookBorrower) {
                            return [2 /*return*/, { message: "Pas d'emprunteur", reponse: false, result: null }];
                        }
                        student = library_schema_1.StudentLibrarySchema.safeParse({
                            userId: bookBorrower.user.userId,
                            userFirstName: bookBorrower.user.userFirstName,
                            userFamilyName: bookBorrower.user.userFamilyName,
                            grade: bookBorrower.user.grade ? bookBorrower.user.grade.gradeName : "Aucun niveau",
                            typeEvent: bookBorrower.bookEventType.toString(),
                        });
                        if (!student.success) {
                            console.error("Erreur de validation Zod :", student.error);
                        }
                        return [2 /*return*/, { message: "emprunteur touvé", reponse: true, result: student.data }];
                    case 2:
                        error_5 = _a.sent();
                        console.error("Erreur Prisma :", error_5);
                        throw error_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LibraryModel.getBookReadingByUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var bookReadingData, bookReading, parsedBookReading, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookEvent.findFirst({
                                where: {
                                    userId: userId,
                                    bookEventType: 1, // type 1 corresponds to books being read
                                },
                                select: {
                                    groupBook: {
                                        select: {
                                            bookGroupId: true,
                                            location: true,
                                            book: {
                                                select: {
                                                    bookTitle: true,
                                                    bookAuthor: true,
                                                    bookPublisher: true,
                                                    bookId: true,
                                                    bookIsbn: true,
                                                }
                                            },
                                        },
                                    },
                                }
                            })];
                    case 1:
                        bookReadingData = _a.sent();
                        if (!bookReadingData) {
                            return [2 /*return*/, { message: "Pas de livre associé", reponse: false, result: null }];
                        }
                        bookReading = {
                            bookGroupId: bookReadingData.groupBook.bookGroupId,
                            bookId: bookReadingData.groupBook.book.bookId,
                            bookTitle: bookReadingData.groupBook.book.bookTitle,
                            bookAuthor: bookReadingData.groupBook.book.bookAuthor,
                            bookPublisher: bookReadingData.groupBook.book.bookPublisher,
                            bookIsbn: bookReadingData.groupBook.book.bookIsbn,
                            bookLocation: bookReadingData.groupBook.location,
                        };
                        parsedBookReading = library_schema_1.BookSchema.safeParse(bookReading);
                        if (!parsedBookReading.success) {
                            console.error("Erreur de validation Zod :", parsedBookReading.error);
                            return [2 /*return*/, { message: "Erreur de validation des données", reponse: null, result: null }];
                        }
                        return [2 /*return*/, { message: "Livre touvé", reponse: true, result: parsedBookReading.data }];
                    case 2:
                        error_6 = _a.sent();
                        console.error("Erreur Prisma :", error_6);
                        throw error_6;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //know witch book is reserved by a student
    //params $studentId
    //return message, reponse : boolean, result : BookType|null
    LibraryModel.getBookReservedByUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var bookWaitingData, bookWaiting, parsedBookWaiting, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookEvent.findFirst({
                                where: {
                                    userId: userId,
                                    bookEventType: 4, // type 4 corresponds to reserved books
                                },
                                select: {
                                    bookEventType: true,
                                    bookGroupId: true,
                                    groupBook: {
                                        select: {
                                            location: true,
                                            book: {
                                                select: {
                                                    bookTitle: true,
                                                    bookAuthor: true,
                                                    bookId: true
                                                },
                                            }
                                        },
                                    }
                                }
                            })];
                    case 1:
                        bookWaitingData = _a.sent();
                        if (!bookWaitingData) {
                            return [2 /*return*/, { message: "Pas de livre réservé", reponse: false, result: null }];
                        }
                        bookWaiting = {
                            bookGroupId: bookWaitingData.bookGroupId,
                            bookId: bookWaitingData.groupBook.book.bookId,
                            bookTitle: bookWaitingData.groupBook.book.bookTitle,
                            bookAuthor: bookWaitingData.groupBook.book.bookAuthor,
                            bookLocation: bookWaitingData.groupBook.location,
                        };
                        parsedBookWaiting = library_schema_1.BookSchema.safeParse(bookWaiting);
                        if (!parsedBookWaiting.success) {
                            console.error("Erreur de validation Zod :", parsedBookWaiting.error);
                            return [2 /*return*/, { message: "Erreur de validation des données", reponse: null, result: null }];
                        }
                        return [2 /*return*/, { message: "Livre touvé", reponse: true, result: parsedBookWaiting.data }];
                    case 2:
                        error_7 = _a.sent();
                        console.error("Erreur Prisma :", error_7);
                        throw error_7;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LibraryModel.getFilteredBooksProposition = function (titleContent, isbnContent) {
        return __awaiter(this, void 0, void 0, function () {
            var listBookProposition, booksList_1, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.book.findMany({
                                where: {
                                    AND: [
                                        {
                                            bookTitle: {
                                                contains: titleContent,
                                                mode: 'insensitive', // 🔥 ignore la casse
                                            },
                                        },
                                        {
                                            OR: [
                                                {
                                                    bookIsbn: {
                                                        contains: isbnContent.toString(),
                                                    },
                                                },
                                                {
                                                    bookIsbn: {
                                                        contains: "0",
                                                    },
                                                },
                                            ]
                                        },
                                    ],
                                },
                                select: {
                                    bookId: true,
                                    bookTitle: true,
                                    bookAuthor: true,
                                    bookPublisher: true,
                                    bookIsbn: true,
                                },
                            })];
                    case 1:
                        listBookProposition = _a.sent();
                        if (!listBookProposition) {
                            return [2 /*return*/, ({ message: "erreur", reponse: null, result: [] })];
                        }
                        if (listBookProposition.length === 0) {
                            return [2 /*return*/, ({ message: "Pas de livre associé", reponse: false, result: [] })];
                        }
                        booksList_1 = [];
                        listBookProposition.forEach(function (book) {
                            //validation zod
                            var parsedBook = library_schema_1.BookLibraryShortSchema.safeParse(book);
                            if (!parsedBook.success) {
                                console.error("Erreur de validation Zod LibraryModel GetfilteredProposition :", parsedBook.error);
                                return { message: "Erreur de validation Zod LibraryModel GetfilteredProposition :", reponse: null, result: null };
                            }
                            booksList_1.push(parsedBook.data);
                        });
                        return [2 /*return*/, ({ message: "livres trouvés", reponse: true, result: booksList_1 })];
                    case 2:
                        error_8 = _a.sent();
                        console.error("Erreur Prisma :", error_8);
                        throw error_8;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //return {message:string, reponse : boolean, result : [{bookGroupId, title, author, location, bookId, bookISBN}]
    LibraryModel.getGroupsLibrary = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var groupLibraryData, booksList_2, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookGroup.findMany({
                                where: {
                                    groupId: groupId,
                                    onWork: true,
                                    location: {
                                        not: 'per',
                                    },
                                },
                                select: {
                                    bookGroupId: true,
                                    bookId: true,
                                    book: {
                                        select: {
                                            bookTitle: true,
                                            bookAuthor: true,
                                            bookIsbn: true,
                                        },
                                    },
                                    location: true,
                                },
                                orderBy: {
                                    book: {
                                        bookTitle: 'asc',
                                    },
                                },
                            })];
                    case 1:
                        groupLibraryData = _a.sent();
                        if (!groupLibraryData || groupLibraryData.length === 0) {
                            return [2 /*return*/, { message: "Pas de livre associé getGroupsLibrary", reponse: false, result: [] }];
                        }
                        booksList_2 = [];
                        groupLibraryData.forEach(function (bookI) {
                            var book = {
                                bookGroupId: bookI.bookGroupId,
                                bookTitle: bookI.book.bookTitle,
                                bookAuthor: bookI.book.bookAuthor,
                                bookLocation: bookI.location,
                                bookId: bookI.bookId,
                                bookIsbn: bookI.book.bookIsbn,
                            };
                            //validation zod
                            var parsedBook = library_schema_1.BookSchema.safeParse(book);
                            if (!parsedBook.success) {
                                console.error("Erreur de validation Zod :", parsedBook.error);
                                return { message: "Erreur de validation des données", reponse: null, result: null };
                            }
                            booksList_2.push(parsedBook.data);
                        });
                        return [2 /*return*/, { message: "Livres trouvés", reponse: true, result: booksList_2 }];
                    case 2:
                        error_9 = _a.sent();
                        console.error("Erreur Prisma :", error_9);
                        throw error_9;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LibraryModel.getNbReadedBook = function (bookId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var readCount, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookEvent.count({
                                where: {
                                    userId: userId,
                                    bookEventType: 2,
                                    groupBook: {
                                        book: {
                                            bookId: bookId,
                                        },
                                    },
                                },
                            })];
                    case 1:
                        readCount = _a.sent();
                        if (!readCount) {
                            return [2 /*return*/, { message: "Erreur dans la récupération du nombre de lectures", reponse: null, result: null }];
                        }
                        return [2 /*return*/, { message: "réussite", reponse: true, result: readCount }];
                    case 2:
                        error_10 = _a.sent();
                        console.error("Erreur Prisma :", error_10);
                        throw error_10;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //know witch books are not enable to borrow (borrowed or reserved)
    //params groupId
    //return message:string, reponse:bool, result : array groups_book_id
    LibraryModel.getNotEnableBooks = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var booksListData, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookEvent.findMany({
                                where: {
                                    groupBook: {
                                        groupId: groupId,
                                    },
                                    bookEventType: {
                                        in: [1, 4], // 1 = borrowed, 4 = reserved
                                    },
                                },
                                select: {
                                    bookGroupId: true,
                                },
                            })];
                    case 1:
                        booksListData = _a.sent();
                        if (!booksListData) {
                            return [2 /*return*/, { message: "pb dans la requête", reponse: null, result: [] }];
                        }
                        return [2 /*return*/, { message: "réussite", reponse: booksListData.length === 0 ? false : true, result: booksListData }];
                    case 2:
                        error_11 = _a.sent();
                        console.error("Erreur Prisma :", error_11);
                        throw error_11;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //get list of periods boutin ha ispisal a group
    //params groupId
    //return message, reponse, resultat : array[periods[periodSchema]]
    LibraryModel.getPeriodsList = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var periodListReq, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.periodlibrary.findMany({
                                where: {
                                    OR: [
                                        { groupId: groupId },
                                        { groupId: null }
                                    ]
                                },
                                select: {
                                    periodId: true,
                                    periodName: true,
                                    dateStart: true,
                                    dateEnd: true,
                                    groupId: true,
                                },
                                orderBy: {
                                    dateStart: 'asc',
                                },
                            })];
                    case 1:
                        periodListReq = _a.sent();
                        if (!periodListReq) {
                            return [2 /*return*/, ({ message: "erreur", reponse: null, result: [] })];
                        }
                        if (periodListReq.length === 0) {
                            return [2 /*return*/, ({ message: "noPeriod", reponse: false, result: [] })];
                        }
                        return [2 /*return*/, ({ message: 'okPeriods', reponse: true, result: periodListReq })];
                    case 2:
                        error_12 = _a.sent();
                        console.error("Erreur Prisma :", error_12);
                        throw error_12;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LibraryModel.getReferenceBookInGroupLibrary = function (bookId, groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var referenceBooks, booksList_3, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookGroup.findMany({
                                where: {
                                    bookId: bookId,
                                    groupId: groupId,
                                    onWork: true,
                                },
                                select: {
                                    bookGroupId: true,
                                    bookId: true,
                                    location: true,
                                    book: {
                                        select: {
                                            bookTitle: true,
                                            bookAuthor: true,
                                            bookIsbn: true,
                                            bookPublisher: true,
                                        },
                                    },
                                },
                            })];
                    case 1:
                        referenceBooks = _a.sent();
                        if (!referenceBooks) {
                            return [2 /*return*/, ({ message: "erreur", reponse: null, result: [] })];
                        }
                        if (referenceBooks.length === 0) {
                            return [2 /*return*/, ({ message: "Pas de livre associé", reponse: false, result: [] })];
                        }
                        booksList_3 = [];
                        referenceBooks.map(function (bookI) {
                            var book = {
                                bookId: bookI.bookId,
                                bookTitle: bookI.book.bookTitle,
                                bookAuthor: bookI.book.bookAuthor,
                                bookPublisher: bookI.book.bookPublisher,
                                bookIsbn: bookI.book.bookIsbn,
                                bookGroupId: bookI.bookGroupId,
                                bookLocation: bookI.location,
                            };
                            //validation zod
                            var parsedBook = library_schema_1.BookSchema.safeParse(book);
                            if (!parsedBook.success) {
                                console.error("LibraryModel, getREferenceBookInGroupLibrary : Erreur de validation Zod :", parsedBook.error);
                                return { message: "Erreur de validation des données", reponse: null, result: null };
                            }
                            booksList_3.push(parsedBook.data);
                        });
                        return [2 /*return*/, ({ message: "Livres touvés", reponse: true, result: booksList_3 })];
                    case 2:
                        error_13 = _a.sent();
                        console.error("Erreur Prisma :", Error);
                        throw error_13;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LibraryModel.getStatsBooksList = function (groupId, period, locations) {
        return __awaiter(this, void 0, void 0, function () {
            var statsBooksSearch, booksList_4, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookGroup.findMany({
                                where: {
                                    AND: [
                                        { groupId: groupId },
                                        { dateAdd: {
                                                lte: period.periodEnd
                                            }
                                        },
                                        { OR: [
                                                { dateRemove: null },
                                                { dateRemove: {
                                                        gte: period.periodEnd
                                                    }
                                                }
                                            ]
                                        },
                                        { location: {
                                                in: locations
                                            }
                                        }
                                    ]
                                },
                                distinct: ['bookId'],
                                select: {
                                    bookId: true,
                                    book: {
                                        select: {
                                            bookTitle: true,
                                            bookAuthor: true,
                                            bookPublisher: true,
                                        }
                                    },
                                },
                                orderBy: {
                                    book: {
                                        bookTitle: 'asc'
                                    }
                                }
                            })];
                    case 1:
                        statsBooksSearch = _a.sent();
                        if (!statsBooksSearch) {
                            return [2 /*return*/, ({ message: "erreur", reponse: null, result: [] })];
                        }
                        if (statsBooksSearch.length === 0) {
                            return [2 /*return*/, ({ message: "noStats", reponse: false, result: [] })];
                        }
                        booksList_4 = [];
                        statsBooksSearch.map(function (data) {
                            var book = {
                                bookId: data.bookId,
                                bookTitle: data.book.bookTitle,
                                bookAuthor: data.book.bookAuthor,
                                bookPublisher: data.book.bookPublisher
                            };
                            booksList_4.push(book);
                        });
                        return [2 /*return*/, ({ message: 'livres trouvés', reponse: true, result: booksList_4 })];
                    case 2:
                        error_14 = _a.sent();
                        console.error("Erreur Prisma :", error_14);
                        throw error_14;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LibraryModel.getStatsBookDatas = function (bookId, period, locations) {
        return __awaiter(this, void 0, void 0, function () {
            var statsBook, count1_1, count2_1, count3_1, count4_1, users1_1, users2_1, users3_1, users4_1, stats, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookEvent.findMany({
                                where: {
                                    AND: [
                                        { groupBook: { bookId: bookId }
                                        },
                                        { bookEventDate: {
                                                gte: period.periodStart,
                                                lte: period.periodEnd
                                            }
                                        },
                                    ]
                                },
                                select: {
                                    bookGroupId: true,
                                    bookEventType: true,
                                    user: {
                                        select: {
                                            userFamilyName: true,
                                            userFirstName: true,
                                        }
                                    },
                                    groupBook: {
                                        select: {
                                            book: {
                                                select: {
                                                    bookTitle: true,
                                                    bookAuthor: true,
                                                    bookId: true,
                                                },
                                            },
                                        }
                                    }
                                }
                            })];
                    case 1:
                        statsBook = _a.sent();
                        if (!statsBook) {
                            return [2 /*return*/, ({ message: 'erreur', reponse: null, result: null })];
                        }
                        count1_1 = 0;
                        count2_1 = 0;
                        count3_1 = 0;
                        count4_1 = 0;
                        users1_1 = "";
                        users2_1 = "";
                        users3_1 = "";
                        users4_1 = "";
                        if (statsBook.length === 0) {
                            return [2 /*return*/, ({ message: 'empty', reponse: false, result: {
                                        reading: { nbr: count1_1,
                                            concerned: users1_1 },
                                        readed: {
                                            nbr: count2_1,
                                            concerned: users2_1
                                        },
                                        noReaded: {
                                            nbr: count3_1,
                                            concerned: users3_1
                                        },
                                        reserved: {
                                            nbr: count4_1,
                                            concerned: users4_1
                                        }
                                    }
                                })];
                        }
                        statsBook.map(function (data) {
                            if (data.bookEventType === 1) {
                                users1_1 = users1_1 !== "" ? users1_1 + ", " + data.user.userFirstName + " " + data.user.userFamilyName : (data.user.userFirstName + " " + data.user.userFamilyName);
                                count1_1++;
                            }
                            else if (data.bookEventType === 2) {
                                users2_1 = users2_1 !== "" ? users2_1 + ", " + data.user.userFirstName + " " + data.user.userFamilyName : (data.user.userFirstName + " " + data.user.userFamilyName);
                                count2_1++;
                            }
                            else if (data.bookEventType === 3) {
                                users3_1 = users3_1 !== "" ? users3_1 + ", " + data.user.userFirstName + " " + data.user.userFamilyName : (data.user.userFirstName + " " + data.user.userFamilyName);
                                count3_1++;
                            }
                            else if (data.bookEventType === 4) {
                                users4_1 = users4_1 !== "" ? users4_1 + ", " + data.user.userFirstName + " " + data.user.userFamilyName : (data.user.userFirstName + " " + data.user.userFamilyName);
                                count4_1++;
                            }
                        });
                        stats = {
                            reading: { nbr: count1_1,
                                concerned: users1_1 },
                            readed: {
                                nbr: count2_1,
                                concerned: users2_1
                            },
                            noReaded: {
                                nbr: count3_1,
                                concerned: users3_1
                            },
                            reserved: {
                                nbr: count4_1,
                                concerned: users4_1
                            }
                        };
                        return [2 /*return*/, ({ message: "réussite", reponse: true, result: stats })];
                    case 2:
                        error_15 = _a.sent();
                        console.error("Erreur Prisma :", error_15);
                        throw error_15;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LibraryModel.getStatsStudentDatas = function (userId, period, locations) {
        return __awaiter(this, void 0, void 0, function () {
            var statsStudent, count2_2, count3_2, count4_2, books2_1, books3_1, books4_1, bookMap_1, booksList, booksConcerned_1, stats, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookEvent.findMany({
                                where: {
                                    AND: [
                                        { userId: userId },
                                        { bookEventDate: {
                                                gte: period.periodStart,
                                                lte: period.periodEnd
                                            }
                                        },
                                        { groupBook: {
                                                location: {
                                                    in: locations
                                                }
                                            }
                                        }
                                    ]
                                },
                                select: {
                                    bookGroupId: true,
                                    bookEventType: true,
                                    groupBook: {
                                        select: {
                                            book: {
                                                select: {
                                                    bookTitle: true,
                                                    bookAuthor: true,
                                                    bookId: true,
                                                },
                                            },
                                        }
                                    }
                                }
                            })];
                    case 1:
                        statsStudent = _a.sent();
                        if (!statsStudent) {
                            return [2 /*return*/, ({ message: 'erreur', reponse: null, result: null })];
                        }
                        count2_2 = 0;
                        count3_2 = 0;
                        count4_2 = 0;
                        books2_1 = "";
                        books3_1 = "";
                        books4_1 = "";
                        if (statsStudent.length === 0) {
                            return [2 /*return*/, ({ message: 'empty', reponse: false, result: {
                                        readed: {
                                            nbr: count2_2,
                                            concerned: books2_1
                                        },
                                        noReaded: {
                                            nbr: count3_2,
                                            concerned: books3_1
                                        },
                                        reserved: {
                                            nbr: count4_2,
                                            concerned: books4_1
                                        },
                                        distinctReaded: {
                                            nbr: 0,
                                            concerned: ''
                                        }
                                    }
                                })];
                        }
                        bookMap_1 = new Map();
                        statsStudent.map(function (data) {
                            if (data.bookEventType === 2) {
                                books2_1 = books2_1 !== "" ? books2_1 + ", " + data.groupBook.book.bookTitle + (data.groupBook.book.bookAuthor !== null ? " - " + data.groupBook.book.bookAuthor : "") : data.groupBook.book.bookTitle + (data.groupBook.book.bookAuthor !== null ? " - " + data.groupBook.book.bookAuthor : "");
                                count2_2++;
                                //on regroupe dans bookMap les bookId distincts afin de connaitre le nombre de livres distincts lus
                                var key = data.groupBook.book.bookId;
                                if (!bookMap_1.has(key)) {
                                    bookMap_1.set(key, data.groupBook.book);
                                }
                            }
                            else if (data.bookEventType === 3) {
                                books3_1 = books3_1 !== "" ? books3_1 + ", " + data.groupBook.book.bookTitle + (data.groupBook.book.bookAuthor !== null ? " - " + data.groupBook.book.bookAuthor : "") : data.groupBook.book.bookTitle + (data.groupBook.book.bookAuthor !== null ? " - " + data.groupBook.book.bookAuthor : "");
                                count3_2++;
                            }
                            else if (data.bookEventType === 4) {
                                books4_1 = books4_1 !== "" ? books4_1 + ", " + data.groupBook.book.bookTitle + (data.groupBook.book.bookAuthor !== null ? " - " + data.groupBook.book.bookAuthor : "") : data.groupBook.book.bookTitle + (data.groupBook.book.bookAuthor !== null ? " - " + data.groupBook.book.bookAuthor : "");
                                count4_2++;
                            }
                        });
                        booksList = Array.from(bookMap_1.values());
                        booksConcerned_1 = "";
                        booksList.map(function (book) {
                            var info = book.bookTitle + (book.bookAuthor !== null ? " - " + book.bookAuthor : "");
                            booksConcerned_1 = booksConcerned_1 === "" ? info : booksConcerned_1 + ", " + info;
                        });
                        stats = {
                            readed: {
                                nbr: count2_2,
                                concerned: books2_1
                            },
                            noReaded: {
                                nbr: count3_2,
                                concerned: books3_1
                            },
                            reserved: {
                                nbr: count4_2,
                                concerned: books4_1
                            },
                            distinctReaded: {
                                nbr: booksList.length,
                                concerned: booksConcerned_1
                            }
                        };
                        return [2 /*return*/, ({ message: "réussite", reponse: true, result: stats })];
                    case 2:
                        error_16 = _a.sent();
                        console.error("Erreur Prisma :", error_16);
                        throw error_16;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LibraryModel.getStudentsListLibraryByGroup = function (groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var usersWithEvents, studentsList, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.user.findMany({
                                where: {
                                    userRoles: {
                                        some: {
                                            roleId: 1,
                                        },
                                    },
                                    userGroups: {
                                        some: {
                                            groupId: groupId,
                                        },
                                    },
                                },
                                select: {
                                    userId: true,
                                    userFamilyName: true,
                                    userFirstName: true,
                                    grade: {
                                        select: {
                                            gradeName: true,
                                        },
                                    },
                                    bookEvents: {
                                        where: {
                                            bookEventType: {
                                                in: [1, 4],
                                            },
                                        },
                                        select: {
                                            bookEventType: true,
                                        },
                                    },
                                },
                                orderBy: [
                                    { gradeId: 'asc' },
                                    { userFamilyName: 'asc' },
                                    { userFirstName: 'asc' },
                                ]
                            })];
                    case 1:
                        usersWithEvents = _a.sent();
                        if (!usersWithEvents) {
                            return [2 /*return*/, { message: "Erreur du serveur", reponse: null, result: null }];
                        }
                        if (usersWithEvents.length === 0) {
                            return [2 /*return*/, { message: "library.studentsList.noStudent", reponse: false, result: [] }];
                        }
                        studentsList = usersWithEvents.map(function (user) {
                            var typeEvents = user.bookEvents.length === 0
                                ? ""
                                : user.bookEvents.map(function (event) { return event.bookEventType; }).join(", ");
                            var gradeName = user.grade ? user.grade.gradeName : "Aucun niveau";
                            var student = {
                                userId: user.userId,
                                userFamilyName: user.userFamilyName,
                                userFirstName: user.userFirstName,
                                grade: gradeName,
                                typeEvent: typeEvents,
                            };
                            //on valide avec zod
                            var parsedStudent = library_schema_1.StudentLibrarySchema.safeParse(student);
                            if (!parsedStudent.success) {
                                console.error("Erreur de validation Zod :", parsedStudent.error);
                                return student;
                            }
                            return parsedStudent.data;
                        });
                        return [2 /*return*/, {
                                message: "Liste des élèves récupérée avec succès",
                                reponse: true,
                                result: studentsList
                            }];
                    case 2:
                        error_17 = _a.sent();
                        console.error("Erreur Prisma :", error_17);
                        throw error_17;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //return {message:string, reponse : boolean, result:[{myuser_id, first_name, family_name}]
    LibraryModel.getWaitersABookList = function (bookGroupId) {
        return __awaiter(this, void 0, void 0, function () {
            var waitersList, formattedList, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookEvent.findMany({
                                where: {
                                    bookEventType: 4,
                                    bookGroupId: bookGroupId,
                                },
                                select: {
                                    user: {
                                        select: {
                                            userId: true,
                                            userFamilyName: true,
                                            userFirstName: true,
                                        },
                                    },
                                },
                            })];
                    case 1:
                        waitersList = _a.sent();
                        if (!waitersList) {
                            return [2 /*return*/, { message: "Personne dans la liste d'attente", reponse: null, result: [] }];
                        }
                        if (waitersList.length === 0) {
                            return [2 /*return*/, { message: "Personne dans la liste d'attente", reponse: false, result: [] }];
                        }
                        formattedList = waitersList.map(function (waiter) { return ({
                            userId: waiter.user.userId,
                            userFirstName: waiter.user.userFirstName,
                            userFamilyName: waiter.user.userFamilyName,
                        }); });
                        return [2 /*return*/, { message: "Liste d'attente trouvée", reponse: true, result: formattedList }];
                    case 2:
                        error_18 = _a.sent();
                        console.error("Erreur Prisma :", error_18);
                        throw error_18;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //return message, reponse, result :rang (number) d'un user dans liste d'attente ou Null si absent de la liste
    LibraryModel.getWaitingListRenkUser = function (bookGroupId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var waitingListBook, waitingListRank, waitingListCounter, searching;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, LibraryModel.getWaitersABookList(bookGroupId)];
                    case 1:
                        waitingListBook = _a.sent();
                        waitingListRank = null;
                        waitingListCounter = 0;
                        searching = true;
                        if (waitingListBook.reponse) {
                            while (searching && waitingListCounter < waitingListBook.result.length) {
                                if (waitingListBook.result[waitingListCounter].userId === userId) {
                                    searching = false;
                                    waitingListRank = waitingListCounter;
                                }
                                else {
                                    waitingListCounter = waitingListCounter + 1;
                                }
                            }
                        }
                        return [2 /*return*/, waitingListRank];
                }
            });
        });
    };
    //return {message:string, reponse : boolean, result:boolean}
    LibraryModel.isABookBorrowed = function (bookGroupId) {
        return __awaiter(this, void 0, void 0, function () {
            var isBookBorrowed, error_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookEvent.findFirst({
                                where: {
                                    bookGroupId: bookGroupId,
                                    bookEventType: 1,
                                },
                                select: {
                                    bookEventId: true,
                                }
                            })];
                    case 1:
                        isBookBorrowed = _a.sent();
                        return [2 /*return*/, { message: "réussite", reponse: true, result: (isBookBorrowed === null || isBookBorrowed === void 0 ? void 0 : isBookBorrowed.bookEventId) ? 1 : 0 }];
                    case 2:
                        error_19 = _a.sent();
                        console.error("Erreur Prisma :", error_19);
                        throw error_19;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LibraryModel.isABookReserved = function (bookGroupId) {
        return __awaiter(this, void 0, void 0, function () {
            var bookReserved, error_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookEvent.findFirst({
                                where: {
                                    bookGroupId: bookGroupId,
                                    bookEventType: 4, // type 4 corresponds to reserved books
                                },
                                select: {
                                    bookGroupId: true,
                                }
                            })];
                    case 1:
                        bookReserved = _a.sent();
                        if (!bookReserved) {
                            return [2 /*return*/, { message: "Pas de réservation pour ce livre", reponse: false, result: null }];
                        }
                        return [2 /*return*/, { message: "réussite", reponse: true, result: bookReserved }];
                    case 2:
                        error_20 = _a.sent();
                        console.error("Erreur Prisma :", error_20);
                        throw error_20;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LibraryModel.isBookGroupInGroupLibrary = function (bookGroupId, groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var bookGroup, error_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookGroup.findFirst({
                                where: {
                                    bookGroupId: bookGroupId,
                                    groupId: groupId,
                                },
                                select: {
                                    bookGroupId: true,
                                },
                            })];
                    case 1:
                        bookGroup = _a.sent();
                        if (!bookGroup) {
                            return [2 /*return*/, { message: "Livre non trouvé dans la bibliothèque du groupe", reponse: false, result: null }];
                        }
                        return [2 /*return*/, { message: "Livre trouvé dans la bibliothèque du groupe", reponse: true, result: bookGroup.bookGroupId }];
                    case 2:
                        error_21 = _a.sent();
                        return [2 /*return*/, { message: "erreur dans la requête", reponse: null, result: null }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //return {boolean}
    LibraryModel.isBookReservedEnableToBorrow = function (bookGroupId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var bookReservedBorrowed, listWaiters, error_22;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, LibraryModel.isABookBorrowed(bookGroupId)];
                    case 1:
                        bookReservedBorrowed = _a.sent();
                        if (!(bookReservedBorrowed.result === 1)) return [3 /*break*/, 2];
                        return [2 /*return*/, false];
                    case 2: return [4 /*yield*/, LibraryModel.getWaitersABookList(bookGroupId)];
                    case 3:
                        listWaiters = _a.sent();
                        if (listWaiters.reponse !== null && listWaiters.reponse && listWaiters.result[0].userId === userId) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_22 = _a.sent();
                        console.error("Erreur dans la vérification de la réservation :", error_22);
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    LibraryModel.addBookInGroupLibrary = function (book, bookWork) {
        return __awaiter(this, void 0, void 0, function () {
            var addBook, error_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookGroup.create({
                                data: {
                                    groupId: book.groupId,
                                    bookId: book.bookId,
                                    location: book.bookLocation,
                                    onWork: bookWork === 1 ? true : false,
                                    dateAdd: new Date(),
                                },
                            })];
                    case 1:
                        addBook = _a.sent();
                        if (!addBook) {
                            return [2 /*return*/, ({ message: "LibraryModel, addBookInGroupLibrary, erreur", reponse: null, result: null })];
                        }
                        return [2 /*return*/, ({ message: "réussite", reponse: true, result: addBook.bookGroupId })];
                    case 2:
                        error_23 = _a.sent();
                        console.error("Erreur dans addBookInGroupLibrary :", error_23);
                        throw error_23;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LibraryModel.borrowABook = function (userId, bookGroupId) {
        return __awaiter(this, void 0, void 0, function () {
            var isTheBookReserved, checkBookReservation, myWork;
            var _this = this;
            return __generator(this, function (_a) {
                isTheBookReserved = function () { return __awaiter(_this, void 0, void 0, function () {
                    var result, isReserved, error_24;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, LibraryModel.getBookReservedByUser(userId)];
                            case 1:
                                result = _a.sent();
                                isReserved = false;
                                if (result.result && result.result.bookGroupId === bookGroupId) {
                                    isReserved = true;
                                }
                                return [2 /*return*/, isReserved];
                            case 2:
                                error_24 = _a.sent();
                                console.error("Erreur dans checkIsReserved :", error_24);
                                return [2 /*return*/, { message: "Erreur lors de la vérification", reponse: false }];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                checkBookReservation = function () { return __awaiter(_this, void 0, void 0, function () {
                    var isBookReserved, bookUpdate, bookBorrow, error_25;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 6, , 7]);
                                return [4 /*yield*/, isTheBookReserved()];
                            case 1:
                                isBookReserved = _a.sent();
                                if (!isBookReserved) return [3 /*break*/, 3];
                                return [4 /*yield*/, client_1.prisma.bookEvent.updateMany({
                                        where: {
                                            bookGroupId: bookGroupId,
                                            userId: userId,
                                            bookEventType: 4,
                                        },
                                        data: { bookEventType: 1, bookEventDate: new Date() },
                                    })];
                            case 2:
                                bookUpdate = _a.sent();
                                if (bookUpdate.count === 0) {
                                    console.warn("Aucun événement mis à jour.");
                                    return [2 /*return*/, { message: "Pas de réservation pour ce livre", reponse: false, result: null }];
                                }
                                if (bookUpdate.count > 1) {
                                    return [2 /*return*/, { message: "".concat(bookUpdate.count, " \u00E9v\u00E9nement(s) mis \u00E0 jour."), reponse: false, result: null }];
                                }
                                return [2 /*return*/, { message: "".concat(bookUpdate.count, " \u00E9v\u00E9nement(s) mis \u00E0 jour."), reponse: true, result: null }];
                            case 3: return [4 /*yield*/, client_1.prisma.bookEvent.create({
                                    data: {
                                        userId: userId,
                                        bookGroupId: bookGroupId,
                                        bookEventType: 1,
                                        bookEventDate: new Date(),
                                    }
                                })];
                            case 4:
                                bookBorrow = _a.sent();
                                if (!bookBorrow) {
                                    console.warn("Aucun événement mis à jour.");
                                    return [2 /*return*/, { message: "impossible d'emprunter le livre", reponse: false, result: null }];
                                }
                                return [2 /*return*/, { message: "réussite", reponse: true, result: null }];
                            case 5: return [3 /*break*/, 7];
                            case 6:
                                error_25 = _a.sent();
                                console.error("Erreur dans borrowABook :", error_25);
                                return [3 /*break*/, 7];
                            case 7: return [2 /*return*/];
                        }
                    });
                }); };
                myWork = checkBookReservation();
                return [2 /*return*/, myWork];
            });
        });
    };
    LibraryModel.createBookInLibrary = function (book) {
        return __awaiter(this, void 0, void 0, function () {
            var bookToCreate, addBook, error_26;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bookToCreate = {
                            bookTitle: book.bookTitle,
                            bookAuthor: book.bookAuthor,
                            bookPublisher: book.bookPublisher,
                            bookIsbn: book.bookIsbn,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, client_1.prisma.book.create({
                                data: {
                                    bookTitle: bookToCreate.bookTitle,
                                    bookAuthor: bookToCreate.bookAuthor,
                                    bookPublisher: bookToCreate.bookPublisher,
                                    bookIsbn: bookToCreate.bookIsbn,
                                },
                            })];
                    case 2:
                        addBook = _a.sent();
                        if (!addBook) {
                            return [2 /*return*/, ({ message: "LibraryModel, createBookInLibrary, erreur", reponse: null, result: null })];
                        }
                        return [2 /*return*/, ({ message: "réussite", reponse: true, result: addBook.bookId })];
                    case 3:
                        error_26 = _a.sent();
                        console.error("Erreur dans createBookInLibrary :", error_26);
                        throw error_26;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LibraryModel.createPeriod = function (period) {
        return __awaiter(this, void 0, void 0, function () {
            var periodToCreate, addPeriod, error_27;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        periodToCreate = {
                            periodName: period.periodName,
                            dateStart: period.periodStart,
                            dateEnd: period.periodEnd,
                            groupId: typeof period.periodType === "string" ? null : period.periodType,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, client_1.prisma.periodlibrary.create({
                                data: {
                                    periodName: periodToCreate.periodName,
                                    dateStart: periodToCreate.dateStart,
                                    dateEnd: periodToCreate.dateEnd,
                                    groupId: periodToCreate.groupId,
                                },
                            })];
                    case 2:
                        addPeriod = _a.sent();
                        if (!addPeriod) {
                            return [2 /*return*/, ({ message: "LibraryModel, createPeriod, erreur", reponse: null, result: null })];
                        }
                        return [2 /*return*/, ({ message: "réussite", reponse: true, result: addPeriod.periodId })];
                    case 3:
                        error_27 = _a.sent();
                        console.error("Erreur dans createPeriod :", error_27);
                        throw error_27;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //annuler l'emprunt d'un livre
    //return : message, reponse
    LibraryModel.removeBorrowABook = function (userId, bookGroupId) {
        return __awaiter(this, void 0, void 0, function () {
            var removeBorrow, error_28;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookEvent.deleteMany({
                                where: {
                                    userId: userId,
                                    bookGroupId: bookGroupId,
                                    bookEventType: 1,
                                },
                            })];
                    case 1:
                        removeBorrow = _a.sent();
                        if (removeBorrow.count === 0) {
                            return [2 /*return*/, ({ message: "libraryModel, removeBoorowABook, erreur", reponse: false })];
                        }
                        return [2 /*return*/, ({ message: "réussite", reponse: true })];
                    case 2:
                        error_28 = _a.sent();
                        console.error("Erreur dans removeBorrowABook :", error_28);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LibraryModel.removeBookAllReservation = function (bookGroupId) {
        return __awaiter(this, void 0, void 0, function () {
            var removeReservation, error_29;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookEvent.deleteMany({
                                where: {
                                    bookGroupId: bookGroupId,
                                    bookEventType: 4,
                                },
                            })];
                    case 1:
                        removeReservation = _a.sent();
                        if (removeReservation.count === 0) {
                            return [2 /*return*/, ({ message: "libraryModel, removeBookAllReservation, aucune réservation supprimée", reponse: false, result: null })];
                        }
                        return [2 /*return*/, ({ message: "réservation supprimée", reponse: true, result: removeReservation.count })];
                    case 2:
                        error_29 = _a.sent();
                        console.error("Erreur dans removeBookAllReservation :", error_29);
                        throw error_29;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LibraryModel.removePeriod = function (periodId) {
        return __awaiter(this, void 0, void 0, function () {
            var removePeriod, error_30;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.periodlibrary.delete({
                                where: {
                                    periodId: periodId,
                                },
                            })];
                    case 1:
                        removePeriod = _a.sent();
                        if (!removePeriod) {
                            return [2 /*return*/, ({ message: "libraryModel, removePeriod, aucune période supprimée", reponse: null })];
                        }
                        return [2 /*return*/, ({ message: "période supprimée", reponse: true })];
                    case 2:
                        error_30 = _a.sent();
                        console.error("Erreur dans removePeriod :", error_30);
                        throw error_30;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LibraryModel.removeReserveABook = function (userId, bookGroupId) {
        return __awaiter(this, void 0, void 0, function () {
            var removeReserve, error_31;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookEvent.deleteMany({
                                where: {
                                    userId: userId,
                                    bookGroupId: bookGroupId,
                                    bookEventType: 4,
                                },
                            })];
                    case 1:
                        removeReserve = _a.sent();
                        if (removeReserve.count === 0) {
                            return [2 /*return*/, ({ message: "libraryModel, removeBoorowABook, erreur", reponse: false })];
                        }
                        return [2 /*return*/, ({ message: "réussite", reponse: true })];
                    case 2:
                        error_31 = _a.sent();
                        console.error("Erreur dans removeReserveABook :", error_31);
                        throw error_31;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LibraryModel.reserveABook = function (userId, bookGroupId) {
        return __awaiter(this, void 0, void 0, function () {
            var workReserve, error_32;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookEvent.create({
                                data: {
                                    userId: userId,
                                    bookGroupId: bookGroupId,
                                    bookEventType: 4,
                                    bookEventDate: new Date(),
                                }
                            })];
                    case 1:
                        workReserve = _a.sent();
                        if (!workReserve) {
                            return [2 /*return*/, ({ message: "libraryModel, reserveABook, erreur", reponse: null })];
                        }
                        return [2 /*return*/, ({ message: "réussite", reponse: true, result: workReserve.bookEventId })];
                    case 2:
                        error_32 = _a.sent();
                        console.error("Erreur dans LibraryModel reserveABook :", error_32);
                        throw error_32;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //return : message, reponse ('boolean)
    LibraryModel.returnABook = function (userId, bookGroupId, isReaded) {
        return __awaiter(this, void 0, void 0, function () {
            var readedCode, returnBook, error_33;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        readedCode = isReaded ? 2 : 3;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, client_1.prisma.bookEvent.updateMany({
                                where: {
                                    userId: userId,
                                    bookGroupId: bookGroupId,
                                    bookEventType: 1,
                                },
                                data: {
                                    bookEventType: readedCode,
                                    bookEventDate: new Date(),
                                },
                            })];
                    case 2:
                        returnBook = _a.sent();
                        if (returnBook.count === 0) {
                            return [2 /*return*/, ({ message: "libraryModel, returnABook, erreur", reponse: false })];
                        }
                        return [2 /*return*/, ({ message: "réussite", reponse: true })];
                    case 3:
                        error_33 = _a.sent();
                        console.error("Erreur dans returnABook :", error_33);
                        throw error_33;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LibraryModel.updateNoWorkAGroupBook = function (bookGroupId) {
        return __awaiter(this, void 0, void 0, function () {
            var updateNoWork, error_34;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.bookGroup.update({
                                where: {
                                    bookGroupId: bookGroupId,
                                },
                                data: {
                                    onWork: false,
                                    dateRemove: new Date,
                                },
                            })];
                    case 1:
                        updateNoWork = _a.sent();
                        if (!updateNoWork) {
                            return [2 /*return*/, ({ message: "libraryModel, updateNoWorkAGroupBook, erreur", reponse: null })];
                        }
                        return [2 /*return*/, ({ message: "réussite", reponse: true })];
                    case 2:
                        error_34 = _a.sent();
                        console.error("Erreur dans updateNoWorkAGroupBook :", error_34);
                        throw error_34;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LibraryModel.updatePeriod = function (period) {
        return __awaiter(this, void 0, void 0, function () {
            var updatePeriod, error_35;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client_1.prisma.periodlibrary.update({
                                where: {
                                    periodId: period.periodId,
                                },
                                data: {
                                    dateStart: period.periodStart,
                                    dateEnd: period.periodEnd,
                                    periodName: period.periodName,
                                },
                            })];
                    case 1:
                        updatePeriod = _a.sent();
                        if (!updatePeriod) {
                            return [2 /*return*/, ({ message: "libraryModel, updatePeriod, erreur", reponse: false })];
                        }
                        return [2 /*return*/, ({ message: "réussite", reponse: true })];
                    case 2:
                        error_35 = _a.sent();
                        console.error("Erreur dans updatePeriod :", error_35);
                        throw error_35;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return LibraryModel;
}());
exports.default = LibraryModel;
