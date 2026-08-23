"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LibraryController_1 = __importDefault(require("@srcBack/controller/LibraryController"));
const authMiddleware_1 = require("@srcBack/middleware/authMiddleware");
const checkRoles_1 = require("@srcBack/middleware/checkRoles");
const checkGroupIdPostExists_1 = __importDefault(require("@srcBack/middleware/group/checkGroupIdPostExists"));
const checkBookExists_1 = require("@srcBack/middleware/library/checkBookExists");
const checkUserIdValid_1 = require("@srcBack/middleware/user/checkUserIdValid");
const checkBookGroupIdExists_1 = require("@srcBack/middleware/library/checkBookGroupIdExists");
const express_1 = __importDefault(require("express"));
const checkUserIdReadBookGroupId_1 = __importDefault(require("@srcBack/middleware/library/checkUserIdReadBookGroupId"));
const checkReturnABook_1 = __importDefault(require("@srcBack/middleware/library/checkReturnABook"));
const checkTitleContentValid_1 = __importDefault(require("@srcBack/middleware/checkTitleContentValid"));
const checkIsbn_1 = __importDefault(require("@srcBack/middleware/library/checkIsbn"));
const checkBookIdExists_1 = __importDefault(require("@srcBack/middleware/library/checkBookIdExists"));
const checkBookToGroupListValid_1 = __importDefault(require("@srcBack/middleware/library/checkBookToGroupListValid"));
const checkBookToGroupListExists_1 = __importDefault(require("@srcBack/middleware/library/checkBookToGroupListExists"));
const checkBookWorkValid_1 = __importDefault(require("@srcBack/middleware/library/checkBookWorkValid"));
const checkPeriodLocationsValid_1 = require("@srcBack/middleware/library/checkPeriodLocationsValid");
const checkPeriodIdExists_1 = __importDefault(require("@srcBack/middleware/library/checkPeriodIdExists"));
const checkPeriodValid_1 = __importDefault(require("@srcBack/middleware/library/checkPeriodValid"));
const checkNewPeriodValid_1 = __importDefault(require("@srcBack/middleware/library/checkNewPeriodValid"));
const router = express_1.default.Router();
router.post("/studentsListBygroup", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), checkGroupIdPostExists_1.default, LibraryController_1.default.getStudentsListLibraryByGroup);
//obtenir la liste des livres empruntables par un utilisateur en tenant compte d'une réservation éventuelle
router.post("/getBooksListToBorrowForUserId", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), checkGroupIdPostExists_1.default, LibraryController_1.default.getBooksListToBorrowForUserId);
//obtenir les datas d'un livre empruntable
router.post("/bookToBorrowData", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), (0, checkUserIdValid_1.checkUserIdValid)(), checkBookExists_1.checkBookExists, LibraryController_1.default.getBookToBorrowData);
//obtenir la liste des livres empruntables
router.post("/getBooksListToReserveByGroup", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), checkGroupIdPostExists_1.default, LibraryController_1.default.getBooksListToReserveByGroup);
//obtenir les datas des livres empruntables 
router.post("/bookToReserveData", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), (0, checkUserIdValid_1.checkUserIdValid)(), checkBookExists_1.checkBookExists, LibraryController_1.default.getBookToReserveData);
//obtenir le livre actuellement emprunté par un utilisateur
router.post("/bookReadingByuser", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), (0, checkUserIdValid_1.checkUserIdValid)(), LibraryController_1.default.getBookReadingByUser);
router.post("/bookWaitingByuser", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), (0, checkUserIdValid_1.checkUserIdValid)(), LibraryController_1.default.getBookWaitingByUser);
//emprunter un livre
router.post("/borrowABook", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), (0, checkUserIdValid_1.checkUserIdValid)(), checkBookGroupIdExists_1.checkBookGroupIdExists, LibraryController_1.default.borrowABook);
//annuler un emprunt
router.post("/removeBorrowABook", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), checkUserIdReadBookGroupId_1.default, LibraryController_1.default.removeBorrowABook);
//rendre un livre emprunté, lu ou non
router.post("/returnABook", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), checkUserIdReadBookGroupId_1.default, checkReturnABook_1.default, LibraryController_1.default.returnABook);
router.post("/getFilteredBooksProposition", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), checkTitleContentValid_1.default, checkIsbn_1.default, LibraryController_1.default.getFilteredBooksProposition);
router.post("/getReferenceBookInGroupLibrary", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), checkBookIdExists_1.default, checkGroupIdPostExists_1.default, LibraryController_1.default.getReferenceBookInGroupLibrary);
router.post("/createBook", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), checkBookToGroupListValid_1.default, LibraryController_1.default.createBookInLibrary);
router.post("/addBook", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), checkBookToGroupListExists_1.default, checkBookWorkValid_1.default, LibraryController_1.default.addBookInGroupLibrary);
router.post("/modifyBook", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), checkBookToGroupListExists_1.default, LibraryController_1.default.modifyBookInLibrary);
router.post("/reserveABook", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), (0, checkUserIdValid_1.checkUserIdValid)(), checkBookGroupIdExists_1.checkBookGroupIdExists, LibraryController_1.default.reserveABook);
router.post("/removeReserveABook", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), (0, checkUserIdValid_1.checkUserIdValid)(), checkBookGroupIdExists_1.checkBookGroupIdExists, LibraryController_1.default.removeReserveABook);
router.post("/groupBooksList", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), checkGroupIdPostExists_1.default, LibraryController_1.default.getGroupsLibrary);
router.post("/removeGroupBookFromList", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), checkBookGroupIdExists_1.checkBookGroupIdExists, LibraryController_1.default.removeGroupBookFromList);
router.post("/getPeriodsList", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), checkGroupIdPostExists_1.default, LibraryController_1.default.getPeriodsList);
router.post("/getStatsBooksDatas", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), checkGroupIdPostExists_1.default, checkPeriodLocationsValid_1.checkPeriodLocationsValid, LibraryController_1.default.getStatsBooksDatas);
router.post("/getStatsStudentsDatas", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), checkGroupIdPostExists_1.default, checkPeriodLocationsValid_1.checkPeriodLocationsValid, LibraryController_1.default.getStatsStudentsDatas);
router.post("/removePeriod", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), checkPeriodIdExists_1.default, LibraryController_1.default.removePeriod);
router.post("/updatePeriod", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), checkPeriodValid_1.default, LibraryController_1.default.updatePeriod);
router.post("/createPeriod", authMiddleware_1.isAuthenticated, (0, checkRoles_1.checkRoles)(["TEACHER"]), checkNewPeriodValid_1.default, LibraryController_1.default.createPeriod);
exports.default = router;
