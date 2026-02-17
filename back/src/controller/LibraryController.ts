import { Request, Response } from "express";

import LibraryModel from "@srcBack/model/LibraryModel";
import { BookReadingSchema, BookStatType, BookType, BookWaitingSchema, StudentLibraryType, StudentStatsType, PeriodType, LocationsType } from "@shared/schema/library.schema";

export default class LibraryController {

  //obtenir la liste des livres empruntables par un utilisateur en tenant compte d'une réservation éventuelle
  static async getBooksListToBorrowForUserId(req: Request,res: Response)  {
    const { userId, waiting, groupId } = req.body;
      
    const bookToBorrowToSend: BookType[] = []
    try{
      //si l'élève a réservé un livre et que celui-ci est disponible, on remplace la liste
      if(waiting) { //réservation en cours
        //récupérer le livre réservé par l'élève
        const bookReservedReq = await LibraryModel.getBookReservedByUser(userId);
        if (!bookReservedReq ) {
          res.status(400).json({ message: "erreur bookReserved", reponse: null, result : [] });
          return;
        }
        if (bookReservedReq.reponse === null) {
          res.status(400).json({ message: bookReservedReq.message, reponse: null, result : [] });
          return;
        }
        if (!bookReservedReq.reponse || bookReservedReq.result === null) {
          res.status(200).json({ message: bookReservedReq.message, reponse: false, result : bookReservedReq.result });
          return;
        }
        const bookReserved = bookReservedReq.result;
          
        //savoir si le livre réservé est disponible à l'emprunt
        //le livre est-il disponible ?
        const isAvailable = await LibraryModel.isBookReservedEnableToBorrow(bookReserved.bookGroupId, userId);
        if(isAvailable){
          // formater la réponse pour coller au type Book dans l'applicationReadingBookBox
          const bookReservedToBorrow : BookType={
            bookGroupId: bookReserved.bookGroupId,
            bookTitle: bookReserved.bookTitle,
            bookAuthor: bookReserved.bookAuthor,
            bookLocation: bookReserved.bookLocation,
            bookReservation: true,
            bookId: bookReserved.bookId,
          }
          bookToBorrowToSend.push(bookReservedToBorrow);
        }
      }

      if(bookToBorrowToSend.length === 0) { //si on a trouvé un livre à emprunter, on ne fait pas la suite
        // Récupération de l'ensemble des livres de la classe
        const groupLibrary = await LibraryModel.getGroupsLibrary(groupId);
  
        if (groupLibrary.reponse === null) {
          res.status(400).json({ message: groupLibrary.message, reponse : null, result :[] });
          return;
        }
        else if(!groupLibrary.reponse) {
          res.status(200).json({ message: "library.studentsList.noBook", booksToBorrow : [] }); 
          return;
        }
          
        //récupération des livres non disponibles à l'emprunt car empruntés ou réservés
        const notEnableBooks = await LibraryModel.getNotEnableBooks(groupId);
        if (notEnableBooks.reponse === null) {
            res.status(400).json({ message: notEnableBooks.message, reponse : null, result : [] });
            return;
        }
        // on enlève les livres non disponibles de la liste des livres de la classe
        const filteredBooks : BookType[]=[]
        groupLibrary.result.map((book) => {
          let addToList = true;
          notEnableBooks.result.map((bookNotEnable) => {
            if (book.bookGroupId === bookNotEnable.bookGroupId) {
              addToList = false;
            }
          })
          addToList && filteredBooks.push(book)
        });
        bookToBorrowToSend.push(...filteredBooks);
      } 
      res.status(200).json({ message: "library.studentsList.bookFind", reponse: true, result : bookToBorrowToSend });
      return
    }
    catch (error) {
      console.error("Erreur dans le contrôleur :", error);
      res.status(500).json({ message: "Erreur serveur",reponse : null, result : [] });
      return
    }
  }

  static async getBooksListToReserveByGroup (req: Request,res: Response) {
    const { groupId } = req.body;
    try{
    // Récupération de l'ensemble des livres de la classe
    const groupLibrary = await LibraryModel.getGroupsLibrary(groupId);

        if (groupLibrary.reponse === null) {
            res.status(400).json({ message: groupLibrary.message, reponse:null, result : [] });
            return
        }
        if(!groupLibrary.reponse) {
            res.status(200).json({ message: "library.studentsList.noBook", reponse:false, result : [] });
            return
        }
        
    res.status(200).json({ message: "library.studentsList.bookFind", reponse:true, result: groupLibrary.result });
    return
    }
    catch (error) {
        console.error("Erreur dans le contrôleur : getBooksListToReserveByGroup", error);
         res.status(500).json({ message: "Erreur serveur" });
         return
      }
}

 static async getBookReadingByUser(req: Request,res: Response)  {
  const { userId } = req.body;
  try {
    // Récupération des informations sur la lecture du livre par l'utilisateur
    const results = await LibraryModel.getBookReadingByUser(userId);

    if (results.reponse === null) {
      res.status(400).json({ message: results.message, reponse:null, result : null });
      return;
    }
    if (!results.reponse || results.result === null) {
      res.status(200).json({ message: results.message,reponse:false, result: null });
      return;
    }

    const isReserved = await LibraryModel.isABookReserved(results.result.bookGroupId);

    const bookGroupId = results.result.bookGroupId;
    const nbReaded = await LibraryModel.getNbReadedBook(results.result.bookId, userId);
    let waitingList = '';
    const listWaitersAppel = await LibraryModel.getWaitersABookList(bookGroupId);
    if(listWaitersAppel.reponse){
      const listWaiters = listWaitersAppel.result;
      for(let i = 0 ; i < listWaiters.length; i++){
        waitingList = waitingList + (i!==0?' , ':'')+ listWaiters[i]['userFirstName'] + ' ' + listWaiters[i]['userFamilyName'];
      }
    }

    const myBookFind = {
      bookGroupId: results.result.bookGroupId,
      bookTitle: results.result.bookTitle,
      bookAuthor: results.result.bookAuthor,
      bookLocation: results.result.bookLocation,
      bookReservation : isReserved.reponse,
      numberReaded: nbReaded.result !== null ? nbReaded.result : 0,
      bookId: results.result.bookId,
      waitingList: waitingList,
    }
    
    const parsedBookFind = BookReadingSchema.safeParse(myBookFind);
    if (!parsedBookFind.success) {
      console.error("Validation zod échouée :", parsedBookFind.error);
      res.status(400).json({ message: "Erreur de validation des données", reponse: false, result: [] });
      return;
    }
    res.status(200).json({ message: "library.studentsList.bookFind", reponse: true, result : parsedBookFind.data });
    return;
   
  } catch (error) { 
    console.error("Erreur dans le contrôleur : getBookReadingByUser", error);
    res.status(500).json({ message: "Erreur serveur" });
    return
  }
}

  static async getBookToBorrowData(req: Request,res: Response) {
    try {
      const { book, userId } = req.body;
      const nbReaded = await LibraryModel.getNbReadedBook(book.bookId, userId);
      let waitingList = '';
        
      const listWaitersAppel = await LibraryModel.getWaitersABookList(book.bookGroupId);
      if(listWaitersAppel.reponse ){
        for(let i = 0 ; i < listWaitersAppel.result.length; i++){
            waitingList = waitingList + (i!==0?' , ':'')+ listWaitersAppel.result[i]['userFirstName'] + ' ' + listWaitersAppel.result[i]['userFamilyName'];
        }
      }
      const myBookFind = {
        ...book,
        numberReaded: nbReaded.result === null ? 0 : nbReaded.result,
        waitingList: waitingList,
      }

      //validation zod
      const parsedBookFind = BookReadingSchema.safeParse(myBookFind);
      if (!parsedBookFind.success) {
        console.error("Validation zod échouée :", parsedBookFind.error);
        res.status(400).json({ message: "Erreur de validation des données", reponse: false, result: [] });
        return;
      }
      
      res.status(200).json({ message: "library.studentsList.bookFind", reponse : true, result: myBookFind });
      return;
    }
    catch (error) {
      console.error("Erreur dans le contrôleur :", error);
      res.status(500).json({ message: "Erreur serveur" });
      return;
    }
 }

 static async getBookToReserveData(req: Request,res: Response) {
    try {
      const { book, userId } = req.body;

      const nbReaded = await LibraryModel.getNbReadedBook(book.bookId, userId);
      const actualBookBorrower = await LibraryModel.getActualBookBorrower(book.bookGroupId);
      let waitingList = '';
      let listRenk = 0;
      let actualReader=''
      if(actualBookBorrower.reponse){

          actualReader = actualBookBorrower.result?.userFirstName + ' ' + actualBookBorrower.result?.userFamilyName;
          listRenk = 1

      }
      const listWaitersReq = await LibraryModel.getWaitersABookList(book.bookGroupId);
      if(listWaitersReq.reponse ){
        const listWaiters = listWaitersReq.result;
        for(let i = 0 ; i < listWaiters.length; i++){
            waitingList = waitingList + (i!==0?' , ':'')+ listWaiters[i]['userFirstName'] + ' ' + listWaiters[i]['userFamilyName'];
        }
        listRenk = listWaiters.length + listRenk;

      }
      const myBookFind = {
        ...book,
        numberReaded: nbReaded.result === null ? 0 : nbReaded.result,
        waitingList: waitingList,
        waitingListPlace: listRenk,
        actualReader: actualReader,
      }

      //validation zod
      const parsedBookFind = BookWaitingSchema.safeParse(myBookFind);
      if (!parsedBookFind.success) {
        console.error("Validation zod échouée :", parsedBookFind.error);
        res.status(400).json({ message: "Erreur de validation des données", reponse: false, result: [] });
        return;
      }
      
      res.status(200).json({ message: "library.studentsList.bookFind", reponse : true, result: myBookFind });
      return;

    }
    catch (error) {
      console.error("Erreur dans le contrôleur :", error);
      res.status(500).json({ message: "Erreur serveur" });
      return;
    }
 }

 static async getBookWaitingByUser(req: Request,res: Response) { 
    const { userId } = req.body;
    try{
    // Récupération des informations sur la lecture du livre par l'utilisateur
    const results = await LibraryModel.getBookReservedByUser(userId);

    if(!results || results.reponse === null) {
      res.status(400).json({ message: results.message, reponse:null, result : null });
      return;
    }
    if (!results.reponse || results.result === null) {
      res.status(200).json({ message: results.message, reponse:false, result: null });
      return;
    }
    const bookGroupId = results.result?.bookGroupId;
    const nbReaded = await LibraryModel.getNbReadedBook(results.result.bookId, userId);
    const isAvailable = await LibraryModel.isBookReservedEnableToBorrow(bookGroupId, userId);
    const actualBookBorrower = await LibraryModel.getActualBookBorrower(bookGroupId);
    let listRenk= await LibraryModel.getWaitingListRenkUser(bookGroupId, userId);
    let waitingList = '';
    let actualReader=''
    listRenk = listRenk === null ? 0 : listRenk; //si pas de liste d'attente, on met 0
    if(actualBookBorrower.reponse){
      actualReader = actualBookBorrower.result?.userFirstName + ' ' + actualBookBorrower.result?.userFamilyName;
      listRenk++
    }
    
    const listWaitersAppel = await LibraryModel.getWaitersABookList(bookGroupId);
    if(listWaitersAppel.reponse){
      const listWaiters = listWaitersAppel.result;
      for(let i = 0 ; i < listWaiters.length; i++){
        waitingList = waitingList + (i!==0?' , ':'')+ listWaiters[i]['userFirstName'] + ' ' + listWaiters[i]['userFamilyName'];
      }
    }
    const myBookFind = {
        ...results.result,
        numberReaded: nbReaded.result,
        enableToBorrow : isAvailable,
        waitingListPlace: listRenk,
        waitingList: waitingList,
        actualReader: actualReader,
    }
        res.status(200).json({ message: "library.studentsList.bookFind", reponse : true, result :myBookFind });
        return;
    
    } catch (error) {
      console.error("Erreur dans le contrôleur : getBookWaitingByUser", error);
      res.status(500).json({ message: "Erreur serveur" });
      return;
    }
    
}

static async getFilteredBooksProposition(req: Request,res: Response) {
    const { titleContent, isbnContent } = req.body;
    
    const booksList = await LibraryModel.getFilteredBooksProposition(titleContent, isbnContent);
   

     res.status(200).json(booksList);
     return
}

static async getGroupsLibrary(req: Request,res: Response) {
    const { groupId } = req.body;
  try{
    const groupBooksList = await LibraryModel.getGroupsLibrary(groupId);
    if (!groupBooksList || groupBooksList.reponse === null) {
        res.status(400).json({ message: "LibrayController getGroupsLibrary erreur", reponse : null, result : null });
        return;
    }
    
    res.status(200).json(groupBooksList);
    return
  }
  catch (error) {
    console.error("LibrayController getGroupsLibrary erreur :", error);
    throw error;
  }
   
    
}

static async getPeriodsList(req: Request,res: Response) {
  const { groupId } = req.body;
  
  try {
    const periodsList = await LibraryModel.getPeriodsList(groupId);
    if (!periodsList || periodsList.reponse === null) {
      res.status(400).json({ message: 'error', reponse : null, result : [] });
      return
    }

    if(!periodsList.reponse) {
      res.status(200).json({ message: 'rien', reponse : false, result : [] });
      return
    }

    const periods = periodsList.result.map((period) => {
      let periodType
      let periodName = period.periodName
      if(period.groupId !== null){
        periodType = period.groupId
      }
      else {
        if(/^a/.test(period.periodName)){
          periodType ="a",
          periodName = period.periodName.slice(1)
        } 
        else {
          periodType = 'p',
          periodName = period.periodName.slice(1)
        }
      }
      return {
        periodId: period.periodId,
        periodName: periodName,
        periodStart: period.dateStart,
        periodEnd: period.dateEnd,
        periodType: periodType,
      }
    })
    res.status(200).json({message : periodsList.message, reponse : true, result : periods});
    return
  }
  catch (error) {
    console.error("LibrayController getGroupsLibrary erreur :", error);
    throw error;
  }
}

static async getReferenceBookInGroupLibrary(req: Request,res: Response){
  try {
    const { groupId, bookId } = req.body;
    
   const booksList = await LibraryModel.getReferenceBookInGroupLibrary(bookId, groupId);
   if (booksList.reponse === null) {
        res.status(400).json({ message: 'erreur', reponse:null, result : [] });
        return;
    }
    if(!booksList.reponse) {
        res.status(200).json({ message: 'rien',reponse: false, result : [] });
        return
    }

    res.status(200).json({ message: 'trouv"', reponse: true, result: booksList.result });
    return
  }
  catch (error) {
    console.error("Erreur dans le contrôleur :", error);
    throw error;
  }    
}
  
static async getStatsBooksDatas(req: Request,res: Response) {
    const { groupId, period, locations }: {groupId : number, period : PeriodType, locations : LocationsType}= req.body;
    
    try{
      const booksList = await LibraryModel.getStatsBooksList(groupId, period, locations);
      if (booksList.reponse === null) {
          res.status(400).json({ message: booksList.message, reponse: null });
          return
      }
      if (!booksList.reponse) {
          res.status(200).json(booksList);
          return
      }
      const booksStats : BookStatType[] = [];

      await Promise.all(booksList.result.map(async (book) => {
        const bookDatas = await LibraryModel.getStatsBookDatas(book.bookId, period, locations);
        if(!bookDatas || bookDatas.reponse === null ) {
          res.status(400).json({ message: "erreur dans la requête", reponse: null, result : null})
          return
        }
        const bookToPush = {
          ...book,
          statsReading : {total : bookDatas.result.reading.nbr, concerned : bookDatas.result.reading.concerned},
          statsBorrow : {total : bookDatas.result.readed.nbr + bookDatas.result.noReaded.nbr, concerned : bookDatas.result.readed.concerned + ' ' + bookDatas.result.noReaded.concerned},
          statsReaded : {total : bookDatas.result.readed.nbr, concerned : bookDatas.result.readed.concerned },
          statsReserved : {total : bookDatas.result.reserved.nbr, concerned : bookDatas.result.reserved.concerned },
        }

        booksStats.push(bookToPush)
      }))
      res.status(200).json({ message: "liste ok", reponse: true, result: booksStats });
      return 
    }
    catch (error) {
      console.error("Erreur dans le contrôleur :", error);
      throw error;
    }
  }

static async getStatsStudentsDatas(req : Request, res : Response) {
  const { groupId, period, locations } = req.body;
    
  try {

    //récupérer la liste des élèves
    const studentsList = await LibraryModel.getStudentsListLibraryByGroup(groupId);
    if (!studentsList) {
      res.status(400).json({ message: "erreur dans la requête", reponse: null, result: [] });
      return;
    }
    if (!studentsList.reponse) {
      res.status(400).json(studentsList);
      return
    }
    const studentsDatas : StudentStatsType[]= await Promise.all(studentsList.result.map(async (student) => {
        //nombre de lectures
        const studentDatas = await LibraryModel.getStatsStudentDatas(student.userId, period, locations);

        if(!studentDatas || studentDatas.reponse === null ) {
          throw new Error("Erreur dans la requête pour les données de l'élève");
        }
        return {
          userId : student.userId,
          userFirstName : student.userFirstName,
          userFamilyName : student.userFamilyName,
          grade : student.grade === null ? "Aucun niveau" : student.grade,
          groupId : groupId,
          nbReaded : {total : studentDatas.result.readed.nbr, concerned : studentDatas.result.readed.concerned },
          nbDistinctReaded : {total : studentDatas.result.distinctReaded.nbr, concerned : studentDatas.result.distinctReaded.concerned },
          nbNoReaded : {total : studentDatas.result.noReaded.nbr, concerned : studentDatas.result.noReaded.concerned },
        }

       // studentsDatas.push(studentToPush)
    
      }))
    res.status(200).json({ message: "liste ok", reponse: true, result: studentsDatas });
    return 
  }
  catch (error){
    console.error("Erreur dans le contrôleur :", error);
    throw error;
  }
}

    static async getStudentsListLibraryByGroup( req: Request,res: Response) {
    const { groupId } = req.body;
    
    try {
        const studentsList = await LibraryModel.getStudentsListLibraryByGroup(groupId);
        if (studentsList.reponse === null) {
          res.status(400).json({ message: studentsList.message, reponse: null, result: [] });
          return;
        }
  
        res.status(200).json({ message: studentsList.message, reponse: studentsList.reponse, result: studentsList.result});
  
    } catch (error) {
        console.error("Erreur dans le contrôleur :", error);
        res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
        return
    }
  }

  static async addBookInGroupLibrary(req: Request,res: Response) {
    const { book, work } = req.body;
    
   const addBook = await LibraryModel.addBookInGroupLibrary(book, work);
   if (addBook.reponse === null) {
        res.status(400).json({ message: addBook.message, result : null });
        return;
    }
    res.status(200).json(addBook);
    return
}

  //emprunter un livre
  static async borrowABook (req: Request,res: Response) {
    const { userId, bookGroupId} = req.body;
    
    const borrowABook = await LibraryModel.borrowABook(userId, bookGroupId);
    if (!borrowABook){
      res.status(400).json({message : "erreur borrowABook", reponse: false, result:null});
      return
    } 
    if(!borrowABook.reponse ) {
      res.status(400).json(borrowABook);
      return
    }

    res.status(200).json(borrowABook);
    return

  }

  //créer un livre dans book
  static async createBookInLibrary(req: Request,res: Response){
    const { book } = req.body;
    
    const createBook = await LibraryModel.createBookInLibrary(book);
   if (!createBook || createBook.reponse === null) {
        res.status(400).json({ message: 'erreur', reponse : null, result : null });
        return
    }
    res.status(200).json(createBook);
    return
}

//créer une période dans periodLibrary
  static async createPeriod(req: Request,res: Response){
    const { period } = req.body;
    
    const createPeriod = await LibraryModel.createPeriod(period);
   if (!createPeriod || createPeriod.reponse === null) {
        res.status(400).json({ message: 'erreur', reponse : null, result : null });
        return
    }
    res.status(200).json(createPeriod);
    return
}

static async removeGroupBookFromList(req: Request,res: Response){
    const { bookGroupId } = req.body;
    
    //avant de retirer le livre on vérifie qu'il n'est pas emprunté
    const is_borrowedAsk = await LibraryModel.isABookBorrowed(bookGroupId);
    if(is_borrowedAsk.result){ //le livre est emprunté
        const bookBorrower = await LibraryModel.getActualBookBorrower(bookGroupId);
        res.status(200).json( {message: "livre emprunté", reponse: null , result :bookBorrower.result?.userFirstName + " " + bookBorrower.result?.userFamilyName});
        return
    }
   //avant de retirer le livre on enlève les réservations éventuelles
    const is_reservedAsk = await LibraryModel.isABookReserved(bookGroupId);
    if(is_reservedAsk.reponse){ //le livre est réservé
      const removeBookAllReservation = await LibraryModel.removeBookAllReservation(bookGroupId);
    }

    //on enlève le livre de la liste de la classe
    const removeBookFromList = await LibraryModel.updateNoWorkAGroupBook(bookGroupId);
   if (removeBookFromList.reponse === null) {
        res.status(400).json({ message: 'erreur', reponse :null, result : false });
        return
    }
    
    res.status(200).json({ message: "réussite", reponse : true, result: true });
    return
}

  //annuler l'emprunt d'un livre
  static async removeBorrowABook (req: Request,res: Response) {
    const { userId, bookGroupId } = req.body;
    const removeBorrowABook = await LibraryModel.removeBorrowABook(userId, bookGroupId);
  if (!removeBorrowABook || !removeBorrowABook.reponse) {
      res.status(400).json({ message: "erreur removeBorrowABook", reponse:false });
      return;
  }

  res.status(200).json({ message:"returnOk", reponse: true });
  return
  }

static async removePeriod(req : Request, res : Response)  {
    const { periodId } = req.body;
  try{  
    const removePeriod = await LibraryModel.removePeriod(periodId);
    
    if (removePeriod.reponse === null) {
        res.status(400).json({ message: "error", reponse:false });
        return
    }

    res.status(200).json({ message:"cancelOk", reponse: true });
    return
  }
  catch (error) {
    console.error("Erreur dans le contrôleur :", error);
    res.status(500).json({ message: "Erreur serveur" });
    return
  } 
}

  static async removeReserveABook(req: Request,res: Response) {
    const { userId, bookGroupId } = req.body;
    
    const removeReserveABook = await LibraryModel.removeReserveABook(userId, bookGroupId);
    if (!removeReserveABook || !removeReserveABook.reponse) {
        res.status(400).json({ message: "libraryController.removeReserveABook", result:false });
        return;
    }

    res.status(200).json(removeReserveABook);
    return
};
 
  static async reserveABook (req: Request,res: Response) {
    const { userId, bookGroupId} = req.body;
    
    const reserveABook = await LibraryModel.reserveABook(userId, bookGroupId);
    if (!reserveABook || reserveABook.reponse === null) {
        res.status(400).json({ message: "erreur libraryModel, reserve a book dans le contrôleur", result:false });
        return;
    }

    res.status(200).json(reserveABook);
    return
}
  //retourner un livre emprunté, lu ou non
  static async returnABook (req: Request,res: Response)  {
    const { userId, bookGroupId, isReaded } = req.body;
    
    const returnABook = await LibraryModel.returnABook(userId, bookGroupId, isReaded);
    if (!returnABook || !returnABook.reponse) {
        res.status(400).json({ message: "erreur returnABook", reponse: false });
        return
    }

    res.status(200).json({ message:"returnOk", reponse: true });
    return
  }

  static async updatePeriod(req: Request, res: Response) {
    const { period } = req.body;
    try{
      const updatePeriod = await LibraryModel.updatePeriod(period);
    
      if (updatePeriod.reponse === null) {
          res.status(400).json({ message: "error", reponse:false });
          return
      }

      res.status(200).json({ message:"cancelOk", reponse: true });
      return
    }
    catch (error) {
      console.error("Erreur dans le contrôleur :", error);
      throw error;
    }
  }

}