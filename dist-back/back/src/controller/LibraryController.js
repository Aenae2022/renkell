"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LibraryModel_1 = __importDefault(require("@srcBack/model/LibraryModel"));
const library_schema_1 = require("@shared/schema/library.schema");
const UtilitiesModel_1 = __importDefault(require("@srcBack/model/UtilitiesModel"));
const UserModel_1 = __importDefault(require("@srcBack/model/UserModel"));
class LibraryController {
    //obtenir la liste des livres empruntables par un utilisateur en tenant compte d'une réservation éventuelle
    static async getBooksListToBorrowForUserId(req, res) {
        const { userId, waiting, groupId } = req.body;
        const bookToBorrowToSend = [];
        try {
            //si l'élève a réservé un livre et que celui-ci est disponible, on remplace la liste
            if (waiting) { //réservation en cours
                //récupérer le livre réservé par l'élève
                const bookReservedReq = await LibraryModel_1.default.getBookReservedByUser(userId);
                if (!bookReservedReq) {
                    res.status(400).json({ message: "erreur bookReserved", reponse: null, result: [] });
                    return;
                }
                if (bookReservedReq.reponse === null) {
                    res.status(400).json({ message: bookReservedReq.message, reponse: null, result: [] });
                    return;
                }
                if (!bookReservedReq.reponse || bookReservedReq.result === null) {
                    res.status(200).json({ message: bookReservedReq.message, reponse: false, result: bookReservedReq.result });
                    return;
                }
                const bookReserved = bookReservedReq.result;
                //savoir si le livre réservé est disponible à l'emprunt
                //le livre est-il disponible ?
                const isAvailable = await LibraryModel_1.default.isBookReservedEnableToBorrow(bookReserved.bookGroupId, userId);
                if (isAvailable) {
                    // formater la réponse pour coller au type Book dans l'applicationReadingBookBox
                    const bookReservedToBorrow = {
                        bookGroupId: bookReserved.bookGroupId,
                        bookTitle: bookReserved.bookTitle,
                        bookAuthor: bookReserved.bookAuthor,
                        bookLocation: bookReserved.bookLocation,
                        bookReservation: true,
                        bookId: bookReserved.bookId,
                    };
                    bookToBorrowToSend.push(bookReservedToBorrow);
                }
            }
            if (bookToBorrowToSend.length === 0) { //si on a trouvé un livre à emprunter, on ne fait pas la suite
                // Récupération de l'ensemble des livres de la classe
                const groupLibrary = await LibraryModel_1.default.getGroupsLibrary(groupId);
                if (groupLibrary.reponse === null) {
                    res.status(400).json({ message: groupLibrary.message, reponse: null, result: [] });
                    return;
                }
                else if (!groupLibrary.reponse) {
                    res.status(200).json({ message: "library.studentsList.noBook", booksToBorrow: [] });
                    return;
                }
                //récupération des livres non disponibles à l'emprunt car empruntés ou réservés
                const notEnableBooks = await LibraryModel_1.default.getNotEnableBooks(groupId);
                if (notEnableBooks.reponse === null) {
                    res.status(400).json({ message: notEnableBooks.message, reponse: null, result: [] });
                    return;
                }
                // on enlève les livres non disponibles de la liste des livres de la classe
                const filteredBooks = [];
                groupLibrary.result.map((book) => {
                    let addToList = true;
                    notEnableBooks.result.map((bookNotEnable) => {
                        if (book.bookGroupId === bookNotEnable.bookGroupId) {
                            addToList = false;
                        }
                    });
                    addToList && filteredBooks.push(book);
                });
                bookToBorrowToSend.push(...filteredBooks);
            }
            res.status(200).json({ message: "library.studentsList.bookFind", reponse: true, result: bookToBorrowToSend });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
            return;
        }
    }
    static async getBooksListToReserveByGroup(req, res) {
        const { groupId } = req.body;
        try {
            // Récupération de l'ensemble des livres de la classe
            const groupLibrary = await LibraryModel_1.default.getGroupsLibrary(groupId);
            if (groupLibrary.reponse === null) {
                res.status(400).json({ message: groupLibrary.message, reponse: null, result: [] });
                return;
            }
            if (!groupLibrary.reponse) {
                res.status(200).json({ message: "library.studentsList.noBook", reponse: false, result: [] });
                return;
            }
            res.status(200).json({ message: "library.studentsList.bookFind", reponse: true, result: groupLibrary.result });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur : getBooksListToReserveByGroup", error);
            res.status(500).json({ message: "Erreur serveur" });
            return;
        }
    }
    static async getBookReadingByUser(req, res) {
        const { userId } = req.body;
        try {
            // Récupération des informations sur la lecture du livre par l'utilisateur
            const results = await LibraryModel_1.default.getBookReadingByUser(userId);
            if (results.reponse === null) {
                res.status(400).json({ message: results.message, reponse: null, result: null });
                return;
            }
            if (!results.reponse || results.result === null) {
                res.status(200).json({ message: results.message, reponse: false, result: null });
                return;
            }
            const isReserved = await LibraryModel_1.default.isABookReserved(results.result.bookGroupId);
            const bookGroupId = results.result.bookGroupId;
            const nbReaded = await LibraryModel_1.default.getNbReadedBook(results.result.bookId, userId);
            let waitingList = '';
            const listWaitersAppel = await LibraryModel_1.default.getWaitersABookList(bookGroupId);
            if (listWaitersAppel.reponse) {
                const listWaiters = listWaitersAppel.result;
                for (let i = 0; i < listWaiters.length; i++) {
                    waitingList = waitingList + (i !== 0 ? ' , ' : '') + listWaiters[i]['userFirstName'] + ' ' + listWaiters[i]['userFamilyName'];
                }
            }
            const myBookFind = {
                bookGroupId: results.result.bookGroupId,
                bookTitle: results.result.bookTitle,
                bookAuthor: results.result.bookAuthor,
                bookLocation: results.result.bookLocation,
                bookReservation: isReserved.reponse,
                numberReaded: nbReaded.result !== null ? nbReaded.result : 0,
                bookId: results.result.bookId,
                waitingList: waitingList,
            };
            const parsedBookFind = library_schema_1.BookReadingSchema.safeParse(myBookFind);
            if (!parsedBookFind.success) {
                console.error("Validation zod échouée :", parsedBookFind.error);
                res.status(400).json({ message: "Erreur de validation des données", reponse: false, result: [] });
                return;
            }
            res.status(200).json({ message: "library.studentsList.bookFind", reponse: true, result: parsedBookFind.data });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur : getBookReadingByUser", error);
            res.status(500).json({ message: "Erreur serveur" });
            return;
        }
    }
    static async getBookToBorrowData(req, res) {
        try {
            const { book, userId } = req.body;
            const nbReaded = await LibraryModel_1.default.getNbReadedBook(book.bookId, userId);
            let waitingList = '';
            const listWaitersAppel = await LibraryModel_1.default.getWaitersABookList(book.bookGroupId);
            if (listWaitersAppel.reponse) {
                for (let i = 0; i < listWaitersAppel.result.length; i++) {
                    waitingList = waitingList + (i !== 0 ? ' , ' : '') + listWaitersAppel.result[i]['userFirstName'] + ' ' + listWaitersAppel.result[i]['userFamilyName'];
                }
            }
            const myBookFind = {
                ...book,
                numberReaded: nbReaded.result === null ? 0 : nbReaded.result,
                waitingList: waitingList,
            };
            //validation zod
            const parsedBookFind = library_schema_1.BookReadingSchema.safeParse(myBookFind);
            if (!parsedBookFind.success) {
                console.error("Validation zod échouée :", parsedBookFind.error);
                res.status(400).json({ message: "Erreur de validation des données", reponse: false, result: [] });
                return;
            }
            res.status(200).json({ message: "library.studentsList.bookFind", reponse: true, result: myBookFind });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur" });
            return;
        }
    }
    static async getBookToReserveData(req, res) {
        try {
            const { book, userId } = req.body;
            const nbReaded = await LibraryModel_1.default.getNbReadedBook(book.bookId, userId);
            const actualBookBorrower = await LibraryModel_1.default.getActualBookBorrower(book.bookGroupId);
            let waitingList = '';
            let listRenk = 0;
            let actualReader = '';
            if (actualBookBorrower.reponse) {
                actualReader = actualBookBorrower.result?.userFirstName + ' ' + actualBookBorrower.result?.userFamilyName;
                listRenk = 1;
            }
            const listWaitersReq = await LibraryModel_1.default.getWaitersABookList(book.bookGroupId);
            if (listWaitersReq.reponse) {
                const listWaiters = listWaitersReq.result;
                for (let i = 0; i < listWaiters.length; i++) {
                    waitingList = waitingList + (i !== 0 ? ' , ' : '') + listWaiters[i]['userFirstName'] + ' ' + listWaiters[i]['userFamilyName'];
                }
                listRenk = listWaiters.length + listRenk;
            }
            const myBookFind = {
                ...book,
                numberReaded: nbReaded.result === null ? 0 : nbReaded.result,
                waitingList: waitingList,
                waitingListPlace: listRenk,
                actualReader: actualReader,
            };
            //validation zod
            const parsedBookFind = library_schema_1.BookWaitingSchema.safeParse(myBookFind);
            if (!parsedBookFind.success) {
                console.error("Validation zod échouée :", parsedBookFind.error);
                res.status(400).json({ message: "Erreur de validation des données", reponse: false, result: [] });
                return;
            }
            res.status(200).json({ message: "library.studentsList.bookFind", reponse: true, result: myBookFind });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur" });
            return;
        }
    }
    static async getBookWaitingByUser(req, res) {
        const { userId } = req.body;
        try {
            // Récupération des informations sur la lecture du livre par l'utilisateur
            const results = await LibraryModel_1.default.getBookReservedByUser(userId);
            if (!results || results.reponse === null) {
                res.status(400).json({ message: results.message, reponse: null, result: null });
                return;
            }
            if (!results.reponse || results.result === null) {
                res.status(200).json({ message: results.message, reponse: false, result: null });
                return;
            }
            const bookGroupId = results.result?.bookGroupId;
            const nbReaded = await LibraryModel_1.default.getNbReadedBook(results.result.bookId, userId);
            const isAvailable = await LibraryModel_1.default.isBookReservedEnableToBorrow(bookGroupId, userId);
            const actualBookBorrower = await LibraryModel_1.default.getActualBookBorrower(bookGroupId);
            let listRenk = await LibraryModel_1.default.getWaitingListRenkUser(bookGroupId, userId);
            let waitingList = '';
            let actualReader = '';
            listRenk = listRenk === null ? 0 : listRenk; //si pas de liste d'attente, on met 0
            if (actualBookBorrower.reponse) {
                actualReader = actualBookBorrower.result?.userFirstName + ' ' + actualBookBorrower.result?.userFamilyName;
                listRenk++;
            }
            const listWaitersAppel = await LibraryModel_1.default.getWaitersABookList(bookGroupId);
            if (listWaitersAppel.reponse) {
                const listWaiters = listWaitersAppel.result;
                for (let i = 0; i < listWaiters.length; i++) {
                    waitingList = waitingList + (i !== 0 ? ' , ' : '') + listWaiters[i]['userFirstName'] + ' ' + listWaiters[i]['userFamilyName'];
                }
            }
            const myBookFind = {
                ...results.result,
                numberReaded: nbReaded.result,
                enableToBorrow: isAvailable,
                waitingListPlace: listRenk,
                waitingList: waitingList,
                actualReader: actualReader,
            };
            res.status(200).json({ message: "library.studentsList.bookFind", reponse: true, result: myBookFind });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur : getBookWaitingByUser", error);
            res.status(500).json({ message: "Erreur serveur" });
            return;
        }
    }
    static async getFilteredBooksProposition(req, res) {
        const { titleContent, isbnContent } = req.body;
        const booksList = await LibraryModel_1.default.getFilteredBooksProposition(titleContent, isbnContent);
        res.status(200).json(booksList);
        return;
    }
    static async getGroupsLibrary(req, res) {
        const { groupId } = req.body;
        try {
            const groupBooksList = await LibraryModel_1.default.getGroupsLibrary(groupId);
            if (!groupBooksList || groupBooksList.reponse === null) {
                res.status(400).json({ message: "LibrayController getGroupsLibrary erreur", reponse: null, result: null });
                return;
            }
            res.status(200).json(groupBooksList);
            return;
        }
        catch (error) {
            console.error("LibrayController getGroupsLibrary erreur :", error);
            throw error;
        }
    }
    static async getPeriodsList(req, res) {
        const { groupId } = req.body;
        try {
            const periodsList = await LibraryModel_1.default.getPeriodsList(groupId);
            if (!periodsList || periodsList.reponse === null) {
                res.status(400).json({ message: 'error', reponse: null, result: [] });
                return;
            }
            if (!periodsList.reponse) {
                res.status(200).json({ message: 'rien', reponse: false, result: [] });
                return;
            }
            const periods = periodsList.result.map((period) => {
                let periodType;
                let periodName = period.periodName;
                if (period.groupId !== null) {
                    periodType = period.groupId;
                }
                else {
                    if (/^a/.test(period.periodName)) {
                        periodType = "a",
                            periodName = period.periodName.slice(1);
                    }
                    else {
                        periodType = 'p',
                            periodName = period.periodName.slice(1);
                    }
                }
                return {
                    periodId: period.periodId,
                    periodName: periodName,
                    periodStart: period.dateStart,
                    periodEnd: period.dateEnd,
                    periodType: periodType,
                };
            });
            res.status(200).json({ message: periodsList.message, reponse: true, result: periods });
            return;
        }
        catch (error) {
            console.error("LibrayController getGroupsLibrary erreur :", error);
            throw error;
        }
    }
    static async getReferenceBookInGroupLibrary(req, res) {
        try {
            const { groupId, bookId } = req.body;
            const booksList = await LibraryModel_1.default.getReferenceBookInGroupLibrary(bookId, groupId);
            if (booksList.reponse === null) {
                res.status(400).json({ message: 'erreur', reponse: null, result: [] });
                return;
            }
            if (!booksList.reponse) {
                res.status(200).json({ message: 'rien', reponse: false, result: [] });
                return;
            }
            res.status(200).json({ message: 'trouv"', reponse: true, result: booksList.result });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            throw error;
        }
    }
    static async getStatsBooksDatas(req, res) {
        const { groupId, period, locations } = req.body;
        try {
            const booksList = await LibraryModel_1.default.getStatsBooksList(groupId, period, locations);
            if (booksList.reponse === null) {
                res.status(400).json({ message: booksList.message, reponse: null });
                return;
            }
            if (!booksList.reponse) {
                res.status(200).json(booksList);
                return;
            }
            const booksStats = [];
            await Promise.all(booksList.result.map(async (book) => {
                const bookDatas = await LibraryModel_1.default.getStatsBookDatas(book.bookId, period, locations);
                if (!bookDatas || bookDatas.reponse === null) {
                    res.status(400).json({ message: "erreur dans la requête", reponse: null, result: null });
                    return;
                }
                const bookToPush = {
                    ...book,
                    statsReading: { total: bookDatas.result.reading.nbr, concerned: bookDatas.result.reading.concerned },
                    statsBorrow: { total: bookDatas.result.readed.nbr + bookDatas.result.noReaded.nbr, concerned: bookDatas.result.readed.concerned + ' ' + bookDatas.result.noReaded.concerned },
                    statsReaded: { total: bookDatas.result.readed.nbr, concerned: bookDatas.result.readed.concerned },
                    statsReserved: { total: bookDatas.result.reserved.nbr, concerned: bookDatas.result.reserved.concerned },
                };
                booksStats.push(bookToPush);
            }));
            res.status(200).json({ message: "liste ok", reponse: true, result: booksStats });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            throw error;
        }
    }
    static async getStatsStudentsDatas(req, res) {
        const { groupId, period, locations } = req.body;
        try {
            //récupérer la liste des élèves
            const studentsList = await LibraryModel_1.default.getStudentsListLibraryByGroup(groupId);
            if (!studentsList) {
                res.status(400).json({ message: "erreur dans la requête", reponse: null, result: [] });
                return;
            }
            if (!studentsList.reponse) {
                res.status(200).json({ message: "noStudent", reponse: false, result: [] });
                return;
            }
            const studentsDatas = await Promise.all(studentsList.result.map(async (student) => {
                //nombre de lectures
                const studentDatas = await LibraryModel_1.default.getStatsStudentDatas(student.userId, period, locations);
                if (!studentDatas || studentDatas.reponse === null) {
                    throw new Error("Erreur dans la requête pour les données de l'élève");
                }
                return {
                    userId: student.userId,
                    userFirstName: student.userFirstName,
                    userFamilyName: student.userFamilyName,
                    grade: student.grade === null ? "Aucun niveau" : student.grade,
                    groupId: groupId,
                    nbReaded: { total: studentDatas.result.readed.nbr, concerned: studentDatas.result.readed.concerned },
                    nbDistinctReaded: { total: studentDatas.result.distinctReaded.nbr, concerned: studentDatas.result.distinctReaded.concerned },
                    nbNoReaded: { total: studentDatas.result.noReaded.nbr, concerned: studentDatas.result.noReaded.concerned },
                };
                // studentsDatas.push(studentToPush)
            }));
            res.status(200).json({ message: "liste ok", reponse: true, result: studentsDatas });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            throw error;
        }
    }
    static async getStudentsListLibraryByGroup(req, res) {
        const { groupId } = req.body;
        try {
            const studentsList = await LibraryModel_1.default.getStudentsListLibraryByGroup(groupId);
            if (studentsList.reponse === null) {
                res.status(400).json({ message: studentsList.message, reponse: null, result: [] });
                return;
            }
            res.status(200).json({ message: studentsList.message, reponse: studentsList.reponse, result: studentsList.result });
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
            return;
        }
    }
    static async addBookInGroupLibrary(req, res) {
        const { book, work } = req.body;
        console.log("----------------controller adBookInGroupLibrary", book);
        //on met à jour la bd Book au cas où des données seraient ajoutées
        const newBook = {
            bookId: book.bookId,
            bookTitle: book.bookTitle,
            bookAuthor: book.bookAuthor,
            bookPublisher: book.bookPublisher,
            bookIsbn: book.bookIsbn,
        };
        const updateBook = await LibraryModel_1.default.updateBook(newBook);
        if (!updateBook.reponse) {
            res.status(200).json({ message: updateBook.message, result: null });
            return;
        }
        console.log("------------------- on va ajouter le livre au groupe");
        const addBook = await LibraryModel_1.default.addBookInGroupLibrary(book, work);
        if (addBook.reponse === null) {
            res.status(400).json({ message: addBook.message, result: null });
            return;
        }
        res.status(200).json(addBook);
        return;
    }
    //emprunter un livre
    static async borrowABook(req, res) {
        const { userId, bookGroupId } = req.body;
        const borrowABook = await LibraryModel_1.default.borrowABook(userId, bookGroupId);
        if (!borrowABook) {
            res.status(400).json({ message: "erreur borrowABook", reponse: false, result: null });
            return;
        }
        if (!borrowABook.reponse) {
            res.status(400).json(borrowABook);
            return;
        }
        res.status(200).json(borrowABook);
        return;
    }
    //créer un livre dans book
    static async createBookInLibrary(req, res) {
        const { book } = req.body;
        console.log("📥 Reçu dans createBookInLibrary :", req.body.book);
        const createBook = await LibraryModel_1.default.createBookInLibrary(book);
        if (!createBook || createBook.reponse === null) {
            res.status(400).json({ message: 'erreur', reponse: null, result: null });
            return;
        }
        res.status(200).json(createBook);
        return;
    }
    //créer une période dans periodLibrary
    static async createPeriod(req, res) {
        const { period } = req.body;
        const createPeriod = await LibraryModel_1.default.createPeriod(period);
        if (!createPeriod || createPeriod.reponse === null) {
            res.status(400).json({ message: 'erreur', reponse: null, result: null });
            return;
        }
        res.status(200).json(createPeriod);
        return;
    }
    static async removeGroupBookFromList(req, res) {
        const { bookGroupId } = req.body;
        //avant de retirer le livre on vérifie qu'il n'est pas emprunté
        const is_borrowedAsk = await LibraryModel_1.default.isABookBorrowed(bookGroupId);
        if (is_borrowedAsk.result) { //le livre est emprunté
            const bookBorrower = await LibraryModel_1.default.getActualBookBorrower(bookGroupId);
            res.status(200).json({ message: "livre emprunté", reponse: null, result: bookBorrower.result?.userFirstName + " " + bookBorrower.result?.userFamilyName });
            return;
        }
        //avant de retirer le livre on enlève les réservations éventuelles
        const is_reservedAsk = await LibraryModel_1.default.isABookReserved(bookGroupId);
        if (is_reservedAsk.reponse) { //le livre est réservé
            const removeBookAllReservation = await LibraryModel_1.default.removeBookAllReservation(bookGroupId);
        }
        //on enlève le livre de la liste de la classe
        const removeBookFromList = await LibraryModel_1.default.updateNoWorkAGroupBook(bookGroupId);
        if (removeBookFromList.reponse === null) {
            res.status(400).json({ message: 'erreur', reponse: null, result: false });
            return;
        }
        res.status(200).json({ message: "réussite", reponse: true, result: true });
        return;
    }
    //annuler l'emprunt d'un livre
    static async removeBorrowABook(req, res) {
        const { userId, bookGroupId } = req.body;
        const removeBorrowABook = await LibraryModel_1.default.removeBorrowABook(userId, bookGroupId);
        if (!removeBorrowABook || !removeBorrowABook.reponse) {
            res.status(400).json({ message: "erreur removeBorrowABook", reponse: false });
            return;
        }
        res.status(200).json({ message: "returnOk", reponse: true });
        return;
    }
    static async removePeriod(req, res) {
        const { periodId } = req.body;
        try {
            const removePeriod = await LibraryModel_1.default.removePeriod(periodId);
            if (removePeriod.reponse === null) {
                res.status(400).json({ message: "error", reponse: false });
                return;
            }
            res.status(200).json({ message: "cancelOk", reponse: true });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            res.status(500).json({ message: "Erreur serveur" });
            return;
        }
    }
    static async removeReserveABook(req, res) {
        const { userId, bookGroupId } = req.body;
        const removeReserveABook = await LibraryModel_1.default.removeReserveABook(userId, bookGroupId);
        if (!removeReserveABook || !removeReserveABook.reponse) {
            res.status(400).json({ message: "libraryController.removeReserveABook", result: false });
            return;
        }
        res.status(200).json(removeReserveABook);
        return;
    }
    ;
    static async reserveABook(req, res) {
        const { userId, bookGroupId } = req.body;
        const reserveABook = await LibraryModel_1.default.reserveABook(userId, bookGroupId);
        if (!reserveABook || reserveABook.reponse === null) {
            res.status(400).json({ message: "erreur libraryModel, reserve a book dans le contrôleur", result: false });
            return;
        }
        res.status(200).json(reserveABook);
        return;
    }
    //retourner un livre emprunté, lu ou non
    static async returnABook(req, res) {
        const { userId, bookGroupId, isReaded } = req.body;
        const returnABook = await LibraryModel_1.default.returnABook(userId, bookGroupId, isReaded);
        if (!returnABook || !returnABook.reponse) {
            res.status(400).json({ message: "erreur returnABook", reponse: false });
            return;
        }
        res.status(200).json({ message: "returnOk", reponse: true });
        return;
    }
    static async updatePeriod(req, res) {
        const { period } = req.body;
        try {
            const updatePeriod = await LibraryModel_1.default.updatePeriod(period);
            if (updatePeriod.reponse === null) {
                res.status(400).json({ message: "error", reponse: false });
                return;
            }
            res.status(200).json({ message: "cancelOk", reponse: true });
            return;
        }
        catch (error) {
            console.error("Erreur dans le contrôleur :", error);
            throw error;
        }
    }
    static async modifyBookInLibrary(req, res) {
        const { book } = req.body;
        console.log('book aui arrive dans controller/modify', book);
        const newBook = {
            bookId: book.bookId,
            bookTitle: book.bookTitle,
            bookAuthor: book.bookAuthor,
            bookIsbn: book.bookIsbn,
            bookPublisher: book.bookPublisher,
        };
        const user = req.user;
        console.log("user dans le controller :", user);
        if (!user) {
            res.status(401).json({ message: "Utilisateur non connecté.", reponse: false });
            return;
        }
        const isSuperAdmin = user.userRoles.some((role) => role.roleName === "SUPER_ADMIN");
        if (isSuperAdmin) {
            // action spécifique pour super_admin : on modifie directement la bd
            console.log("action spécifique pour super_admin");
            console.log('envoie en bd de', newBook);
            try {
                const updateBook = await LibraryModel_1.default.updateBook(newBook);
                res.status(200).json({ message: updateBook.message, reponse: updateBook.reponse, action: 'modif' });
                return;
            }
            catch (error) {
                console.error("Erreur dans le contrôleur :", error);
                throw error;
            }
        }
        else {
            // action pour les autres utilisateurs : on envoie un mail avec les données
            try {
                const recipient = "marenkell@marenkell.com";
                const senderMail = await UserModel_1.default.getUserMailById(user.userId);
                if (!senderMail || senderMail.reponse === null || senderMail.result === "") {
                    res.status(200).json({ message: "erreurEnvoiDemande", reponse: false });
                    return;
                }
                const subject = `Demande de modification de livre`;
                const message = `Demande de : ${user.userFirstName} ${user.userFamilyName} (id:${user.userId}). \n
          Merci de modifier le livre ayant pour id ${book.bookId} avec les nouvelles données suivantes : \n
          Titre : ${book.bookTitle} \n
          Auteur : ${book.bookAuthor} \n
          Isbn : ${book.bookIsbn} \n
          Editeur : ${book.bookPublisher}`;
                const reponseMail = await UtilitiesModel_1.default.newMail(recipient, senderMail.result, subject, message);
                res.status(200).json({ message: reponseMail.message, reponse: reponseMail.reponse, action: 'mail' });
            }
            catch (error) {
                console.error("Erreur lors de l'envoi de l'e-mail :", error);
                throw error;
            }
        }
    }
}
exports.default = LibraryController;
