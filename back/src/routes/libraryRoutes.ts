import  LibraryController  from "@srcBack/controller/LibraryController";
import { isAuthenticated } from "@srcBack/middleware/authMiddleware";
import { checkRoles } from "@srcBack/middleware/checkRoles";
import checkGroupIdPostExists from "@srcBack/middleware/group/checkGroupIdPostExists";
import { checkBookExists } from "@srcBack/middleware/library/checkBookExists";
import { checkUserIdValid } from "@srcBack/middleware/user/checkUserIdValid";
import { checkBookGroupIdExists } from "@srcBack/middleware/library/checkBookGroupIdExists";
import express from "express";
import checkUserIdReadBookGroupId from "@srcBack/middleware/library/checkUserIdReadBookGroupId";
import checkReturnABook from "@srcBack/middleware/library/checkReturnABook";
import checkTitleContentValid from "@srcBack/middleware/checkTitleContentValid";
import checkIsbn from "@srcBack/middleware/library/checkIsbn";
import checkBookIdExists from "@srcBack/middleware/library/checkBookIdExists";
import checkBookToGroupListValid from "@srcBack/middleware/library/checkBookToGroupListValid";
import checkBookToGroupListExists from "@srcBack/middleware/library/checkBookToGroupListExists";
import checkBookWorkValid from "@srcBack/middleware/library/checkBookWorkValid";

const router = express.Router();

router.post("/studentsListBygroup",
    isAuthenticated, checkRoles(["TEACHER"]),
    checkGroupIdPostExists, 
    LibraryController.getStudentsListLibraryByGroup);

//obtenir la liste des livres empruntables par un utilisateur en tenant compte d'une réservation éventuelle
 router.post("/getBooksListToBorrowForUserId", 
    isAuthenticated, checkRoles(["TEACHER"]),
    checkGroupIdPostExists,
    LibraryController.getBooksListToBorrowForUserId);

//obtenir les datas d'un livre empruntable
 router.post("/bookToBorrowData", 
    isAuthenticated, checkRoles(["TEACHER"]),
    checkUserIdValid(), checkBookExists,
    LibraryController.getBookToBorrowData);

//obtenir la liste des livres empruntables
router.post("/getBooksListToReserveByGroup", 
    isAuthenticated, checkRoles(["TEACHER"]),
    checkGroupIdPostExists,
    LibraryController.getBooksListToReserveByGroup)

//obtenir les datas des livres empruntables 
router.post("/bookToReserveData", 
    isAuthenticated, checkRoles(["TEACHER"]),
    checkUserIdValid(), checkBookExists,    
    LibraryController.getBookToReserveData);

//obtenir le livre actuellement emprunté par un utilisateur
router.post("/bookReadingByuser",
    isAuthenticated, checkRoles(["TEACHER"]),
    checkUserIdValid(),
    LibraryController.getBookReadingByUser);

router.post("/bookWaitingByuser",
    isAuthenticated, checkRoles(["TEACHER"]),
    checkUserIdValid(),   
     LibraryController.getBookWaitingByUser);   

//emprunter un livre
router.post("/borrowABook",
    isAuthenticated, checkRoles(["TEACHER"]),
    checkUserIdValid(), checkBookGroupIdExists,
    LibraryController.borrowABook);

//annuler un emprunt
router.post("/removeBorrowABook",
    isAuthenticated, checkRoles(["TEACHER"]),
    checkUserIdReadBookGroupId,
    LibraryController.removeBorrowABook);

//rendre un livre emprunté, lu ou non
router.post("/returnABook", 
    isAuthenticated, checkRoles(["TEACHER"]),
    checkUserIdReadBookGroupId, checkReturnABook,
    LibraryController.returnABook);

router.post("/getFilteredBooksProposition", 
    isAuthenticated, checkRoles(["TEACHER"]),
    checkTitleContentValid, checkIsbn,
    LibraryController.getFilteredBooksProposition);

router.post("/getReferenceBookInGroupLibrary",
    isAuthenticated, checkRoles(["TEACHER"]),
    checkBookIdExists, checkGroupIdPostExists,
    LibraryController.getReferenceBookInGroupLibrary);
    
router.post("/createBook",
    isAuthenticated, checkRoles(["TEACHER"]),
    checkBookToGroupListValid,
    LibraryController.createBookInLibrary)

router.post("/addBook", 
    isAuthenticated, checkRoles(["TEACHER"]),
    checkBookToGroupListExists, checkBookWorkValid,
    LibraryController.addBookInGroupLibrary);

router.post("/reserveABook", 
    isAuthenticated, checkRoles(["TEACHER"]),
    checkUserIdValid(), checkBookGroupIdExists,
    LibraryController.reserveABook);

router.post("/removeReserveABook", 
    isAuthenticated, checkRoles(["TEACHER"]),
    checkUserIdValid(), checkBookGroupIdExists,
    LibraryController.removeReserveABook);

export default router;