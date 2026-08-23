"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const library_schema_1 = require("@shared/schema/library.schema");
const client_1 = require("../lib/prisma/client");
class LibraryModel {
    static async doesBookIdExist(bookId) {
        try {
            const book = await client_1.prisma.book.findUnique({
                where: { bookId: bookId },
                select: { bookId: true },
            });
            return !!book;
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    static async doesBookGroupIdExist(bookGroupId) {
        try {
            const bookGroup = await client_1.prisma.bookGroup.findUnique({
                where: { bookGroupId: bookGroupId },
                select: { bookGroupId: true },
            });
            return !!bookGroup;
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    static async doesPeriodExist(periodId) {
        try {
            const search = await client_1.prisma.periodlibrary.findUnique({
                where: { periodId: periodId },
                select: { periodId: true },
            });
            return !!search;
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    //savoir si un userId lit un bookGroupId
    //return bool
    static async doesUserIdReadBookGroupId(userId, bookGroupId) {
        try {
            const valid = await client_1.prisma.bookEvent.findFirst({
                where: {
                    userId: userId,
                    bookGroupId: bookGroupId,
                    bookEventType: 1,
                },
                select: {
                    userId: true,
                },
            });
            return !!valid;
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    //savoir qui est l'emprunteur actuel d'un livre
    //return {message:string, reponse :bool, result : {userId, userName: results[0]['first_name'] + " " + results[0]['family_name']                 
    static async getActualBookBorrower(bookGroupId) {
        try {
            const bookBorrower = await client_1.prisma.bookEvent.findFirst({
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
            });
            if (!bookBorrower) {
                return { message: "Pas d'emprunteur", reponse: false, result: null };
            }
            const student = library_schema_1.StudentLibrarySchema.safeParse({
                userId: bookBorrower.user.userId,
                userFirstName: bookBorrower.user.userFirstName,
                userFamilyName: bookBorrower.user.userFamilyName,
                grade: bookBorrower.user.grade ? bookBorrower.user.grade.gradeName : "Aucun niveau",
                typeEvent: bookBorrower.bookEventType.toString(),
            });
            if (!student.success) {
                console.error("Erreur de validation Zod :", student.error);
            }
            return { message: "emprunteur touvé", reponse: true, result: student.data };
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    static async getBookReadingByUser(userId) {
        try {
            const bookReadingData = await client_1.prisma.bookEvent.findFirst({
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
            });
            if (!bookReadingData) {
                return { message: "Pas de livre associé", reponse: false, result: null };
            }
            //formater la réponse pour coller au type BookType
            const bookReading = {
                bookGroupId: bookReadingData.groupBook.bookGroupId,
                bookId: bookReadingData.groupBook.book.bookId,
                bookTitle: bookReadingData.groupBook.book.bookTitle,
                bookAuthor: bookReadingData.groupBook.book.bookAuthor,
                bookPublisher: bookReadingData.groupBook.book.bookPublisher,
                bookIsbn: bookReadingData.groupBook.book.bookIsbn,
                bookLocation: bookReadingData.groupBook.location,
            };
            //validation avec zod
            const parsedBookReading = library_schema_1.BookSchema.safeParse(bookReading);
            if (!parsedBookReading.success) {
                console.error("Erreur de validation Zod :", parsedBookReading.error);
                return { message: "Erreur de validation des données", reponse: null, result: null };
            }
            return { message: "Livre touvé", reponse: true, result: parsedBookReading.data };
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    //know witch book is reserved by a student
    //params $studentId
    //return message, reponse : boolean, result : BookType|null
    static async getBookReservedByUser(userId) {
        try {
            const bookWaitingData = await client_1.prisma.bookEvent.findFirst({
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
            });
            if (!bookWaitingData) {
                return { message: "Pas de livre réservé", reponse: false, result: null };
            }
            //formater la réponse pour coller au type BookShortType
            const bookWaiting = {
                bookGroupId: bookWaitingData.bookGroupId,
                bookId: bookWaitingData.groupBook.book.bookId,
                bookTitle: bookWaitingData.groupBook.book.bookTitle,
                bookAuthor: bookWaitingData.groupBook.book.bookAuthor,
                bookLocation: bookWaitingData.groupBook.location,
            };
            //validation avec zod
            const parsedBookWaiting = library_schema_1.BookSchema.safeParse(bookWaiting);
            if (!parsedBookWaiting.success) {
                console.error("Erreur de validation Zod :", parsedBookWaiting.error);
                return { message: "Erreur de validation des données", reponse: null, result: null };
            }
            return { message: "Livre touvé", reponse: true, result: parsedBookWaiting.data };
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    static async getFilteredBooksProposition(titleContent, isbnContent) {
        try {
            const listBookProposition = await client_1.prisma.book.findMany({
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
            });
            if (!listBookProposition) {
                return ({ message: "erreur", reponse: null, result: [] });
            }
            if (listBookProposition.length === 0) {
                return ({ message: "Pas de livre associé", reponse: false, result: [] });
            }
            //validation zod
            const booksList = [];
            listBookProposition.forEach((book) => {
                //validation zod
                const parsedBook = library_schema_1.BookLibraryShortSchema.safeParse(book);
                if (!parsedBook.success) {
                    console.error("Erreur de validation Zod LibraryModel GetfilteredProposition :", parsedBook.error);
                    return { message: "Erreur de validation Zod LibraryModel GetfilteredProposition :", reponse: null, result: null };
                }
                booksList.push(parsedBook.data);
            });
            return ({ message: "livres trouvés", reponse: true, result: booksList });
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    //return {message:string, reponse : boolean, result : [{bookGroupId, title, author, location, bookId, bookISBN}]
    static async getGroupsLibrary(groupId) {
        try {
            const groupLibraryData = await client_1.prisma.bookGroup.findMany({
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
            });
            if (!groupLibraryData || groupLibraryData.length === 0) {
                return { message: "noBookInLibrary", reponse: false, result: [] };
            }
            const booksList = [];
            groupLibraryData.forEach((bookI) => {
                const book = {
                    bookGroupId: bookI.bookGroupId,
                    bookTitle: bookI.book.bookTitle,
                    bookAuthor: bookI.book.bookAuthor,
                    bookLocation: bookI.location,
                    bookId: bookI.bookId,
                    bookIsbn: bookI.book.bookIsbn,
                };
                //validation zod
                const parsedBook = library_schema_1.BookSchema.safeParse(book);
                if (!parsedBook.success) {
                    console.error("Erreur de validation Zod :", parsedBook.error);
                    return { message: "Erreur de validation des données", reponse: null, result: null };
                }
                booksList.push(parsedBook.data);
            });
            return { message: "Livres trouvés", reponse: true, result: booksList };
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    static async getNbReadedBook(bookId, userId) {
        try {
            const readCount = await client_1.prisma.bookEvent.count({
                where: {
                    userId: userId,
                    bookEventType: 2,
                    groupBook: {
                        book: {
                            bookId: bookId,
                        },
                    },
                },
            });
            if (!readCount) {
                return { message: "Erreur dans la récupération du nombre de lectures", reponse: null, result: null };
            }
            return { message: "réussite", reponse: true, result: readCount };
            ;
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    //know witch books are not enable to borrow (borrowed or reserved)
    //params groupId
    //return message:string, reponse:bool, result : array groups_book_id
    static async getNotEnableBooks(groupId) {
        try {
            const booksListData = await client_1.prisma.bookEvent.findMany({
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
            });
            if (!booksListData) {
                return { message: "pb dans la requête", reponse: null, result: [] };
            }
            return { message: "réussite", reponse: booksListData.length === 0 ? false : true, result: booksListData };
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    //get list of periods boutin ha ispisal a group
    //params groupId
    //return message, reponse, resultat : array[periods[periodSchema]]
    static async getPeriodsList(groupId) {
        try {
            const periodListReq = await client_1.prisma.periodlibrary.findMany({
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
            });
            if (!periodListReq) {
                return ({ message: "erreur", reponse: null, result: [] });
            }
            if (periodListReq.length === 0) {
                return ({ message: "noPeriod", reponse: false, result: [] });
            }
            return ({ message: 'okPeriods', reponse: true, result: periodListReq });
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    static async getReferenceBookInGroupLibrary(bookId, groupId) {
        try {
            const referenceBooks = await client_1.prisma.bookGroup.findMany({
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
            });
            if (!referenceBooks) {
                return ({ message: "erreur", reponse: null, result: [] });
            }
            if (referenceBooks.length === 0) {
                return ({ message: "Pas de livre associé", reponse: false, result: [] });
            }
            const booksList = [];
            referenceBooks.map((bookI) => {
                const book = {
                    bookId: bookI.bookId,
                    bookTitle: bookI.book.bookTitle,
                    bookAuthor: bookI.book.bookAuthor,
                    bookPublisher: bookI.book.bookPublisher,
                    bookIsbn: bookI.book.bookIsbn,
                    bookGroupId: bookI.bookGroupId,
                    bookLocation: bookI.location,
                };
                //validation zod
                const parsedBook = library_schema_1.BookSchema.safeParse(book);
                if (!parsedBook.success) {
                    console.error("LibraryModel, getREferenceBookInGroupLibrary : Erreur de validation Zod :", parsedBook.error);
                    return { message: "Erreur de validation des données", reponse: null, result: null };
                }
                booksList.push(parsedBook.data);
            });
            return ({ message: "Livres touvés", reponse: true, result: booksList });
        }
        catch (error) {
            console.error("Erreur Prisma :", Error);
            throw error;
        }
    }
    static async getStatsBooksList(groupId, period, locations) {
        try {
            const statsBooksSearch = await client_1.prisma.bookGroup.findMany({
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
                                        gte: period.periodStart
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
            });
            if (!statsBooksSearch) {
                return ({ message: "erreur", reponse: null, result: [] });
            }
            if (statsBooksSearch.length === 0) {
                return ({ message: "noStats", reponse: false, result: [] });
            }
            const booksList = [];
            statsBooksSearch.map((data) => {
                const book = {
                    bookId: data.bookId,
                    bookTitle: data.book.bookTitle,
                    bookAuthor: data.book.bookAuthor,
                    bookPublisher: data.book.bookPublisher
                };
                booksList.push(book);
            });
            return ({ message: 'livres trouvés', reponse: true, result: booksList });
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    static async getStatsBookDatas(bookId, period, locations) {
        try {
            const statsBook = await client_1.prisma.bookEvent.findMany({
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
            });
            if (!statsBook) {
                return ({ message: 'erreur', reponse: null, result: null });
            }
            let count1 = 0;
            let count2 = 0;
            let count3 = 0;
            let count4 = 0;
            let users1 = "";
            let users2 = "";
            let users3 = "";
            let users4 = "";
            if (statsBook.length === 0) {
                return ({ message: 'empty', reponse: false, result: {
                        reading: { nbr: count1,
                            concerned: users1 },
                        readed: {
                            nbr: count2,
                            concerned: users2
                        },
                        noReaded: {
                            nbr: count3,
                            concerned: users3
                        },
                        reserved: {
                            nbr: count4,
                            concerned: users4
                        }
                    }
                });
            }
            statsBook.map((data) => {
                if (data.bookEventType === 1) {
                    users1 = users1 !== "" ? users1 + ", " + data.user.userFirstName + " " + data.user.userFamilyName : (data.user.userFirstName + " " + data.user.userFamilyName);
                    count1++;
                }
                else if (data.bookEventType === 2) {
                    users2 = users2 !== "" ? users2 + ", " + data.user.userFirstName + " " + data.user.userFamilyName : (data.user.userFirstName + " " + data.user.userFamilyName);
                    count2++;
                }
                else if (data.bookEventType === 3) {
                    users3 = users3 !== "" ? users3 + ", " + data.user.userFirstName + " " + data.user.userFamilyName : (data.user.userFirstName + " " + data.user.userFamilyName);
                    count3++;
                }
                else if (data.bookEventType === 4) {
                    users4 = users4 !== "" ? users4 + ", " + data.user.userFirstName + " " + data.user.userFamilyName : (data.user.userFirstName + " " + data.user.userFamilyName);
                    count4++;
                }
            });
            const stats = {
                reading: { nbr: count1,
                    concerned: users1 },
                readed: {
                    nbr: count2,
                    concerned: users2
                },
                noReaded: {
                    nbr: count3,
                    concerned: users3
                },
                reserved: {
                    nbr: count4,
                    concerned: users4
                }
            };
            return ({ message: "réussite", reponse: true, result: stats });
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    static async getStatsStudentDatas(userId, period, locations) {
        try {
            const statsStudent = await client_1.prisma.bookEvent.findMany({
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
            });
            if (!statsStudent) {
                return ({ message: 'erreur', reponse: null, result: null });
            }
            let count2 = 0;
            let count3 = 0;
            let count4 = 0;
            let books2 = "";
            let books3 = "";
            let books4 = "";
            if (statsStudent.length === 0) {
                return ({ message: 'empty', reponse: false, result: {
                        readed: {
                            nbr: count2,
                            concerned: books2
                        },
                        noReaded: {
                            nbr: count3,
                            concerned: books3
                        },
                        reserved: {
                            nbr: count4,
                            concerned: books4
                        },
                        distinctReaded: {
                            nbr: 0,
                            concerned: ''
                        }
                    }
                });
            }
            const bookMap = new Map();
            statsStudent.map((data) => {
                if (data.bookEventType === 2) {
                    books2 = books2 !== "" ? books2 + "§" + data.groupBook.book.bookTitle + (data.groupBook.book.bookAuthor !== null ? " - " + data.groupBook.book.bookAuthor : "") : data.groupBook.book.bookTitle + (data.groupBook.book.bookAuthor !== null ? " - " + data.groupBook.book.bookAuthor : "");
                    count2++;
                    //on regroupe dans bookMap les bookId distincts afin de connaitre le nombre de livres distincts lus
                    const key = data.groupBook.book.bookId;
                    if (!bookMap.has(key)) {
                        bookMap.set(key, data.groupBook.book);
                    }
                }
                else if (data.bookEventType === 3) {
                    books3 = books3 !== "" ? books3 + "§" + data.groupBook.book.bookTitle + (data.groupBook.book.bookAuthor !== null ? " - " + data.groupBook.book.bookAuthor : "") : data.groupBook.book.bookTitle + (data.groupBook.book.bookAuthor !== null ? " - " + data.groupBook.book.bookAuthor : "");
                    count3++;
                }
                else if (data.bookEventType === 4) {
                    books4 = books4 !== "" ? books4 + "§" + data.groupBook.book.bookTitle + (data.groupBook.book.bookAuthor !== null ? " - " + data.groupBook.book.bookAuthor : "") : data.groupBook.book.bookTitle + (data.groupBook.book.bookAuthor !== null ? " - " + data.groupBook.book.bookAuthor : "");
                    count4++;
                }
            });
            const booksList = Array.from(bookMap.values());
            let booksConcerned = "";
            booksList.map((book) => {
                const info = book.bookTitle + (book.bookAuthor !== null ? " - " + book.bookAuthor : "");
                booksConcerned = booksConcerned === "" ? info : booksConcerned + "§" + info;
            });
            const stats = {
                readed: {
                    nbr: count2,
                    concerned: books2
                },
                noReaded: {
                    nbr: count3,
                    concerned: books3
                },
                reserved: {
                    nbr: count4,
                    concerned: books4
                },
                distinctReaded: {
                    nbr: booksList.length,
                    concerned: booksConcerned
                }
            };
            return ({ message: "réussite", reponse: true, result: stats });
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    static async getStudentsListLibraryByGroup(groupId) {
        try {
            const usersWithEvents = await client_1.prisma.user.findMany({
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
            });
            if (!usersWithEvents) {
                return { message: "Erreur du serveur", reponse: null, result: null };
            }
            if (usersWithEvents.length === 0) {
                return { message: "library.studentsList.noStudent", reponse: false, result: [] };
            }
            const studentsList = usersWithEvents.map((user) => {
                const typeEvents = user.bookEvents.length === 0
                    ? ""
                    : user.bookEvents.map((event) => event.bookEventType).join(", ");
                const gradeName = user.grade ? user.grade.gradeName : "Aucun niveau";
                const student = {
                    userId: user.userId,
                    userFamilyName: user.userFamilyName,
                    userFirstName: user.userFirstName,
                    grade: gradeName,
                    typeEvent: typeEvents,
                };
                //on valide avec zod
                const parsedStudent = library_schema_1.StudentLibrarySchema.safeParse(student);
                if (!parsedStudent.success) {
                    console.error("Erreur de validation Zod :", parsedStudent.error);
                    return student;
                }
                return parsedStudent.data;
            });
            return {
                message: "Liste des élèves récupérée avec succès",
                reponse: true,
                result: studentsList
            };
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    //return {message:string, reponse : boolean, result:[{myuser_id, first_name, family_name}]
    static async getWaitersABookList(bookGroupId) {
        try {
            const waitersList = await client_1.prisma.bookEvent.findMany({
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
            });
            if (!waitersList) {
                return { message: "Personne dans la liste d'attente", reponse: null, result: [] };
            }
            if (waitersList.length === 0) {
                return { message: "Personne dans la liste d'attente", reponse: false, result: [] };
            }
            const formattedList = waitersList.map((waiter) => ({
                userId: waiter.user.userId,
                userFirstName: waiter.user.userFirstName,
                userFamilyName: waiter.user.userFamilyName,
            }));
            return { message: "Liste d'attente trouvée", reponse: true, result: formattedList };
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    //return message, reponse, result :rang (number) d'un user dans liste d'attente ou Null si absent de la liste
    static async getWaitingListRenkUser(bookGroupId, userId) {
        const waitingListBook = await LibraryModel.getWaitersABookList(bookGroupId);
        let waitingListRank = null;
        let waitingListCounter = 0;
        let searching = true;
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
        return waitingListRank;
    }
    //return {message:string, reponse : boolean, result:boolean}
    static async isABookBorrowed(bookGroupId) {
        try {
            const isBookBorrowed = await client_1.prisma.bookEvent.findFirst({
                where: {
                    bookGroupId: bookGroupId,
                    bookEventType: 1,
                },
                select: {
                    bookEventId: true,
                }
            });
            return { message: "réussite", reponse: true, result: isBookBorrowed?.bookEventId ? 1 : 0 };
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    static async isABookReserved(bookGroupId) {
        try {
            const bookReserved = await client_1.prisma.bookEvent.findFirst({
                where: {
                    bookGroupId: bookGroupId,
                    bookEventType: 4, // type 4 corresponds to reserved books
                },
                select: {
                    bookGroupId: true,
                }
            });
            if (!bookReserved) {
                return { message: "Pas de réservation pour ce livre", reponse: false, result: null };
            }
            return { message: "réussite", reponse: true, result: bookReserved };
        }
        catch (error) {
            console.error("Erreur Prisma :", error);
            throw error;
        }
    }
    static async isBookGroupInGroupLibrary(bookGroupId, groupId) {
        try {
            const bookGroup = await client_1.prisma.bookGroup.findFirst({
                where: {
                    bookGroupId: bookGroupId,
                    groupId: groupId,
                },
                select: {
                    bookGroupId: true,
                },
            });
            if (!bookGroup) {
                return { message: "Livre non trouvé dans la bibliothèque du groupe", reponse: false, result: null };
            }
            return { message: "Livre trouvé dans la bibliothèque du groupe", reponse: true, result: bookGroup.bookGroupId };
        }
        catch (error) {
            return { message: "erreur dans la requête", reponse: null, result: null };
            throw error;
        }
    }
    //return {boolean}
    static async isBookReservedEnableToBorrow(bookGroupId, userId) {
        try {
            const bookReservedBorrowed = await LibraryModel.isABookBorrowed(bookGroupId);
            if (bookReservedBorrowed.result === 1) { //le livre est déjà emprunté
                return false;
            }
            else { //le livre n'est pas emprunté, on récupère la liste d'attente
                const listWaiters = await LibraryModel.getWaitersABookList(bookGroupId);
                if (listWaiters.reponse !== null && listWaiters.reponse && listWaiters.result[0].userId === userId) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        catch (error) {
            console.error("Erreur dans la vérification de la réservation :", error);
            return false;
        }
    }
    static async addBookInGroupLibrary(book, bookWork) {
        const datas = {
            groupId: book.groupId,
            bookId: book.bookId,
            location: book.bookLocation,
            onWork: bookWork === 1 ? true : false,
            dateAdd: new Date(),
        };
        console.log("--------- data pour addBook ", datas);
        console.log("🔥 datas complet AVANT create:", JSON.stringify(datas, null, 2));
        try {
            const addBook = await client_1.prisma.bookGroup.create({
                data: datas,
            });
            if (!addBook) {
                return ({ message: "LibraryModel, addBookInGroupLibrary, erreur", reponse: null, result: null });
            }
            return ({ message: "réussite", reponse: true, result: addBook.bookGroupId });
        }
        catch (error) {
            console.error("Erreur dans addBookInGroupLibrary :", error);
            throw error;
        }
    }
    static async borrowABook(userId, bookGroupId) {
        //savoir s'il s'agit d'un livre réservé
        const isTheBookReserved = async () => {
            try {
                const result = await LibraryModel.getBookReservedByUser(userId);
                let isReserved = false;
                if (result.result && result.result.bookGroupId === bookGroupId) {
                    isReserved = true;
                }
                return isReserved;
            }
            catch (error) {
                console.error("Erreur dans checkIsReserved :", error);
                return { message: "Erreur lors de la vérification", reponse: false };
            }
        };
        const checkBookReservation = async () => {
            try {
                const isBookReserved = await isTheBookReserved();
                if (isBookReserved) {
                    const bookUpdate = await client_1.prisma.bookEvent.updateMany({
                        where: {
                            bookGroupId: bookGroupId,
                            userId: userId,
                            bookEventType: 4,
                        },
                        data: { bookEventType: 1, bookEventDate: new Date() },
                    });
                    if (bookUpdate.count === 0) {
                        console.warn("Aucun événement mis à jour.");
                        return { message: "Pas de réservation pour ce livre", reponse: false, result: null };
                    }
                    if (bookUpdate.count > 1) {
                        return { message: `${bookUpdate.count} événement(s) mis à jour.`, reponse: false, result: null };
                    }
                    return { message: `${bookUpdate.count} événement(s) mis à jour.`, reponse: true, result: null };
                }
                else {
                    //on crée un évènement d'emprunt
                    const bookBorrow = await client_1.prisma.bookEvent.create({
                        data: {
                            userId: userId,
                            bookGroupId: bookGroupId,
                            bookEventType: 1,
                            bookEventDate: new Date(),
                        }
                    });
                    if (!bookBorrow) {
                        console.warn("Aucun événement mis à jour.");
                        return { message: "impossible d'emprunter le livre", reponse: false, result: null };
                    }
                    return { message: "réussite", reponse: true, result: null };
                }
            }
            catch (error) {
                console.error("Erreur dans borrowABook :", error);
            }
        };
        const myWork = checkBookReservation(); // Lance le tout
        return myWork;
    }
    static async createBookInLibrary(book) {
        const bookToCreate = {
            bookTitle: book.bookTitle,
            bookAuthor: book.bookAuthor,
            bookPublisher: book.bookPublisher,
            bookIsbn: book.bookIsbn,
        };
        try {
            console.log("🔥 VERSION CREATE BOOK v2");
            console.log("📦 Data envoyée à Prisma :", {
                bookTitle: bookToCreate.bookTitle,
                bookAuthor: bookToCreate.bookAuthor,
                bookPublisher: bookToCreate.bookPublisher,
                bookIsbn: bookToCreate.bookIsbn,
            });
            const addBook = await client_1.prisma.book.create({
                data: {
                    bookTitle: bookToCreate.bookTitle,
                    bookAuthor: bookToCreate.bookAuthor,
                    bookPublisher: bookToCreate.bookPublisher,
                    bookIsbn: bookToCreate.bookIsbn,
                },
            });
            if (!addBook) {
                return ({ message: "LibraryModel, createBookInLibrary, erreur", reponse: null, result: null });
            }
            return ({ message: "réussite", reponse: true, result: addBook.bookId });
        }
        catch (error) {
            console.error("Erreur dans createBookInLibrary :", error);
            throw error;
        }
    }
    static async createPeriod(period) {
        const periodToCreate = {
            periodName: period.periodName,
            dateStart: period.periodStart,
            dateEnd: period.periodEnd,
            groupId: typeof period.periodType === "string" ? null : period.periodType,
        };
        try {
            const addPeriod = await client_1.prisma.periodlibrary.create({
                data: {
                    periodName: periodToCreate.periodName,
                    dateStart: periodToCreate.dateStart,
                    dateEnd: periodToCreate.dateEnd,
                    groupId: periodToCreate.groupId,
                },
            });
            if (!addPeriod) {
                return ({ message: "LibraryModel, createPeriod, erreur", reponse: null, result: null });
            }
            return ({ message: "réussite", reponse: true, result: addPeriod.periodId });
        }
        catch (error) {
            console.error("Erreur dans createPeriod :", error);
            throw error;
        }
    }
    //annuler l'emprunt d'un livre
    //return : message, reponse
    static async removeBorrowABook(userId, bookGroupId) {
        try {
            const removeBorrow = await client_1.prisma.bookEvent.deleteMany({
                where: {
                    userId: userId,
                    bookGroupId: bookGroupId,
                    bookEventType: 1,
                },
            });
            if (removeBorrow.count === 0) {
                return ({ message: "libraryModel, removeBoorowABook, erreur", reponse: false });
            }
            return ({ message: "réussite", reponse: true });
        }
        catch (error) {
            console.error("Erreur dans removeBorrowABook :", error);
        }
    }
    static async removeBookAllReservation(bookGroupId) {
        try {
            const removeReservation = await client_1.prisma.bookEvent.deleteMany({
                where: {
                    bookGroupId: bookGroupId,
                    bookEventType: 4,
                },
            });
            if (removeReservation.count === 0) {
                return ({ message: "libraryModel, removeBookAllReservation, aucune réservation supprimée", reponse: false, result: null });
            }
            return ({ message: "réservation supprimée", reponse: true, result: removeReservation.count });
        }
        catch (error) {
            console.error("Erreur dans removeBookAllReservation :", error);
            throw error;
        }
    }
    static async removePeriod(periodId) {
        try {
            const removePeriod = await client_1.prisma.periodlibrary.delete({
                where: {
                    periodId: periodId,
                },
            });
            if (!removePeriod) {
                return ({ message: "libraryModel, removePeriod, aucune période supprimée", reponse: null });
            }
            return ({ message: "période supprimée", reponse: true });
        }
        catch (error) {
            console.error("Erreur dans removePeriod :", error);
            throw error;
        }
    }
    static async removeReserveABook(userId, bookGroupId) {
        try {
            const removeReserve = await client_1.prisma.bookEvent.deleteMany({
                where: {
                    userId: userId,
                    bookGroupId: bookGroupId,
                    bookEventType: 4,
                },
            });
            if (removeReserve.count === 0) {
                return ({ message: "libraryModel, removeBoorowABook, erreur", reponse: false });
            }
            return ({ message: "réussite", reponse: true });
        }
        catch (error) {
            console.error("Erreur dans removeReserveABook :", error);
            throw error;
        }
    }
    static async reserveABook(userId, bookGroupId) {
        try {
            const workReserve = await client_1.prisma.bookEvent.create({
                data: {
                    userId: userId,
                    bookGroupId: bookGroupId,
                    bookEventType: 4,
                    bookEventDate: new Date(),
                }
            });
            if (!workReserve) {
                return ({ message: "libraryModel, reserveABook, erreur", reponse: null });
            }
            return ({ message: "réussite", reponse: true, result: workReserve.bookEventId });
        }
        catch (error) {
            console.error("Erreur dans LibraryModel reserveABook :", error);
            throw error;
        }
    }
    //return : message, reponse ('boolean)
    static async returnABook(userId, bookGroupId, isReaded) {
        const readedCode = isReaded ? 2 : 3;
        try {
            const returnBook = await client_1.prisma.bookEvent.updateMany({
                where: {
                    userId: userId,
                    bookGroupId: bookGroupId,
                    bookEventType: 1,
                },
                data: {
                    bookEventType: readedCode,
                    bookEventDate: new Date(),
                },
            });
            if (returnBook.count === 0) {
                return ({ message: "libraryModel, returnABook, erreur", reponse: false });
            }
            return ({ message: "réussite", reponse: true });
        }
        catch (error) {
            console.error("Erreur dans returnABook :", error);
            throw error;
        }
    }
    static async updateNoWorkAGroupBook(bookGroupId) {
        try {
            const updateNoWork = await client_1.prisma.bookGroup.update({
                where: {
                    bookGroupId: bookGroupId,
                },
                data: {
                    onWork: false,
                    dateRemove: new Date,
                },
            });
            if (!updateNoWork) {
                return ({ message: "libraryModel, updateNoWorkAGroupBook, erreur", reponse: null });
            }
            return ({ message: "réussite", reponse: true });
        }
        catch (error) {
            console.error("Erreur dans updateNoWorkAGroupBook :", error);
            throw error;
        }
    }
    static async updatePeriod(period) {
        try {
            const updatePeriod = await client_1.prisma.periodlibrary.update({
                where: {
                    periodId: period.periodId,
                },
                data: {
                    dateStart: period.periodStart,
                    dateEnd: period.periodEnd,
                    periodName: period.periodName,
                },
            });
            if (!updatePeriod) {
                return ({ message: "libraryModel, updatePeriod, erreur", reponse: false });
            }
            return ({ message: "réussite", reponse: true });
        }
        catch (error) {
            console.error("Erreur dans updatePeriod :", error);
            throw error;
        }
    }
    static async updateBook(book) {
        try {
            const updateBook = await client_1.prisma.book.update({
                where: {
                    bookId: book.bookId,
                },
                data: {
                    bookTitle: book.bookTitle,
                    bookAuthor: book.bookAuthor,
                    bookIsbn: book.bookIsbn,
                    bookPublisher: book.bookPublisher,
                },
            });
            if (!updateBook) {
                return ({ message: "libraryModel, updateBook, erreur", reponse: false });
            }
            return ({ message: "réussite", reponse: true });
        }
        catch (error) {
            console.error("Erreur dans updateBook :", error);
            throw error;
        }
    }
}
exports.default = LibraryModel;
