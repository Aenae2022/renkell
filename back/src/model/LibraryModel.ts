import { BookLibraryShortSchema, BookLibraryShortType, BookSchema, BookToGroupListType, BookType, StudentLibrarySchema } from '@shared/schema/library.schema';
import { prisma } from '../lib/prisma/client';
import { group } from 'console';
import { EntierPositifType } from '@shared/schema/fields/entierPositif.schema';
import { StringNameTitleType } from '@shared/schema/fields/stringNameTitle.schema';

export default class LibraryModel{

  static async doesBookIdExist(bookId: number): Promise<boolean> {
    try { 
      const book = await prisma.book.findUnique({
        where: { bookId: bookId },
        select: { bookId: true },
      });
      return !!book;
    } catch (error) {
      console.error("Erreur Prisma :", error);
      throw error;
    }
  }

  static async doesBookGroupIdExist(bookGroupId: number): Promise<boolean> {
    try { 
      const bookGroup = await prisma.bookGroup.findUnique({
        where: { bookGroupId: bookGroupId },
        select: { bookGroupId: true },
      });
      return !!bookGroup;
    } catch (error) {
      console.error("Erreur Prisma :", error);
      throw error;
    }
  }

  //savoir si un userId lit un bookGroupId
  //return bool
  static async doesUserIdReadBookGroupId(userId :EntierPositifType, bookGroupId : EntierPositifType) {
    console.log('userId et bookGroupId', userId, bookGroupId)
    try {

      const valid = await prisma.bookEvent.findFirst({
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
    static async getActualBookBorrower(bookGroupId : number) {
      try{
        const bookBorrower = await prisma.bookEvent.findFirst({
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
        })

        if (!bookBorrower) {
            return {message: "Pas d'emprunteur", reponse : false, result : null};
        }
        const student = StudentLibrarySchema.safeParse({
            userId: bookBorrower.user.userId,
           userFirstName: bookBorrower.user.userFirstName,
           userFamilyName: bookBorrower.user.userFamilyName,  
           grade: bookBorrower.user.grade ? bookBorrower.user.grade.gradeName : "Aucun niveau",
           typeEvent: bookBorrower.bookEventType.toString(),
        })
        if( !student.success) {
            console.error("Erreur de validation Zod :", student.error);
        }
        return {message: "emprunteur touvé" ,reponse : true, result : student.data};
           
      }
      catch (error) {
        console.error("Erreur Prisma :", error);
        throw error;
      }
    }

    static async getBookReadingByUser(userId:number) {
      try {
        const bookReadingData = await prisma.bookEvent.findFirst({
            where: {
                userId: userId,
                bookEventType: 1, // type 1 corresponds to books being read
            },
            select: {
                groupBook: {
                  select: {
                    bookGroupId: true,
                    location: true,
                    book : {
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
            return {message: "Pas de livre associé", reponse : false, result : null};
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
      }

        //validation avec zod
        const parsedBookReading = BookSchema.safeParse(bookReading);
        if (!parsedBookReading.success) {
          console.error("Erreur de validation Zod :", parsedBookReading.error);
          return { message: "Erreur de validation des données", reponse: null, result: null };
        }
        return {message: "Livre touvé" ,reponse : true, result : parsedBookReading.data};
      } catch (error) {
        console.error("Erreur Prisma :", error);    
        throw error;
      }
    }

  //know witch book is reserved by a student
    //params $studentId
    //return message, reponse : boolean, result : BookType|null
    static async getBookReservedByUser(userId: number) {
      try{
        const bookWaitingData = await prisma.bookEvent.findFirst({
          where: {
              userId: userId,
              bookEventType: 4, // type 4 corresponds to reserved books
            },
          select: {
            bookEventType: true,
            bookGroupId: true,
            groupBook :{
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
        })

        if (!bookWaitingData) {
          return {message: "Pas de livre réservé", reponse: false, result: null};
        }
        //formater la réponse pour coller au type BookShortType
        const bookWaiting = {
          bookGroupId: bookWaitingData.bookGroupId,
          bookId: bookWaitingData.groupBook.book.bookId,
          bookTitle: bookWaitingData.groupBook.book.bookTitle,
          bookAuthor: bookWaitingData.groupBook.book.bookAuthor,      
          bookLocation: bookWaitingData.groupBook.location,
        }

        //validation avec zod
        const parsedBookWaiting = BookSchema.safeParse(bookWaiting);
        if (!parsedBookWaiting.success) {
          console.error("Erreur de validation Zod :", parsedBookWaiting.error);
          return { message: "Erreur de validation des données", reponse: null, result: null };
        }

        return {message: "Livre touvé" ,reponse : true, result: parsedBookWaiting.data};
      } catch (error) {
        console.error("Erreur Prisma :", error);
        throw error;
      }
    }

  static async  getFilteredBooksProposition(titleContent : StringNameTitleType, isbnContent : number) {
    try{
      const listBookProposition = await prisma.book.findMany({
        where: {
          AND :[
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
      
      if(!listBookProposition){
        return({message: "erreur", reponse: null, result:[]})
      }

      if(listBookProposition.length === 0){
        return({message: "Pas de livre associé", reponse: false, result:[]})  
      }

      //validation zod
      const booksList : BookLibraryShortType[] = [];
  
      listBookProposition.forEach((book) => {
          console.log("LibraryModel GetfilteredProposition book :", book)
          //validation zod
          const parsedBook = BookLibraryShortSchema.safeParse(book);
          if (!parsedBook.success) {
            console.error("Erreur de validation Zod LibraryModel GetfilteredProposition :", parsedBook.error);
            return { message: "Erreur de validation Zod LibraryModel GetfilteredProposition :", reponse: null, result: null };
          }
          booksList.push(parsedBook.data);
        });

      return ({message:"livres trouvés", reponse : true, result: booksList})
    }
    catch (error) {
      console.error("Erreur Prisma :", error);
      throw error;
    }
  }
    
    //return {message:string, reponse : boolean, result : [{bookGroupId, title, author, location, bookId, bookISBN}]
    static  async getGroupsLibrary(groupId : number) {
      try {
        const groupLibraryData = await prisma.bookGroup.findMany({
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
          return {message: "Pas de livre associé getGroupsLibrary", reponse : false, result: []};
        }

        const booksList : BookType[] = [];
  
        groupLibraryData.forEach((bookI) => {
          
          const book  = {
            bookGroupId: bookI.bookGroupId,
            bookTitle: bookI.book.bookTitle,
            bookAuthor: bookI.book.bookAuthor,
            bookLocation: bookI.location,
            bookId: bookI.bookId,
            bookIsbn: bookI.book.bookIsbn,
          }
          //validation zod
          const parsedBook = BookSchema.safeParse(book);
          if (!parsedBook.success) {
            console.error("Erreur de validation Zod :", parsedBook.error);
            return { message: "Erreur de validation des données", reponse: null, result: null };
          }
          booksList.push(parsedBook.data);
        });

        return {message: "Livres trouvés" ,reponse : true, result: booksList};
      }
      catch (error) {
        console.error("Erreur Prisma :", error);
        throw error;
      }
    }

    static async getNbReadedBook(bookId:number, userId:number){
      try {
        const readCount = await prisma.bookEvent.count({
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
          return {message: "Erreur dans la récupération du nombre de lectures", reponse : null, result:null};
        }
        return {message: "réussite", reponse : true, result:readCount};;
      } catch (error) {
        console.error("Erreur Prisma :", error);
        throw error;
      }
    }

    //know witch books are not enable to borrow (borrowed or reserved)
    //params groupId
    //return message:string, reponse:bool, result : array groups_book_id
    static async getNotEnableBooks(groupId :number) {
      try {
        const booksListData = await prisma.bookEvent.findMany({
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
          return {message: "pb dans la requête", reponse : null, result: []};
        }
        return {message: "réussite" ,reponse : booksListData.length === 0 ? false : true, result: booksListData}
      }
      catch (error) {
        console.error("Erreur Prisma :", error);  
        throw error;
      } 
    }
        
    static async getReferenceBookInGroupLibrary(bookId :number, groupId :number){
      try{
        const referenceBooks = await prisma.bookGroup.findMany({
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

        if(!referenceBooks){
          return({message: "erreur", reponse: null, result:[]}) 
        }
        if(referenceBooks.length === 0){
          return ({message: "Pas de livre associé", reponse: false, result:[]})
        }

        const booksList: BookType[] = [];
                    
        referenceBooks.map((bookI) => {  
          const book = {
            bookId: bookI.bookId,
            bookTitle: bookI.book.bookTitle,
            bookAuthor: bookI.book.bookAuthor,
            bookPublisher: bookI.book.bookPublisher,
            bookIsbn: bookI.book.bookIsbn,
            bookGroupId: bookI.bookGroupId,
            bookLocation: bookI.location,
          }
          //validation zod
          const parsedBook = BookSchema.safeParse(book);
          if (!parsedBook.success) {
             console.error("LibraryModel, getREferenceBookInGroupLibrary : Erreur de validation Zod :", parsedBook.error);
             return { message: "Erreur de validation des données", reponse: null, result: null };
          }
          booksList.push(parsedBook.data);
        })
        return({message: "Livres touvés" ,reponse : true, result:booksList})
      }
      catch (error) {
        console.error("Erreur Prisma :", Error);
        throw error;
      }
    }  

    static async getStudentsListLibraryByGroup(groupId: number) {
        try {
          const usersWithEvents = await prisma.user.findMany({
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
                {gradeId: 'asc'},
                {userFamilyName: 'asc'},
                {userFirstName: 'asc'},
            ]
            });

    
        if (!usersWithEvents) {
          return { message: "Erreur du serveur", reponse: null , result :null}
        }
        if (usersWithEvents.length === 0) {
          return { message: "library.studentsList.noStudent", reponse : false, result : usersWithEvents}
        }
    
        const studentsList = usersWithEvents.map((user) => {
          const typeEvents = user.bookEvents.length === 0 
          ?"" 
          : user.bookEvents.map((event) => event.bookEventType).join(", ");
          const gradeName = user.grade ? user.grade.gradeName : "Aucun niveau";

          const student = {
            userId: user.userId,
            userFamilyName: user.userFamilyName,
            userFirstName: user.userFirstName,
            grade: gradeName, 
            typeEvent: typeEvents,
          }
          //on valide avec zod
        const parsedStudent = StudentLibrarySchema.safeParse(student);
        if (!parsedStudent.success) {
          console.error("Erreur de validation Zod :", parsedStudent.error);
          return { message: "Erreur de validation des données", reponse: null, result: null };
        }
          return parsedStudent.data;
        })

        
        return {
          message: "Liste des élèves récupérée avec succès",
          reponse: true,
          result: studentsList
        };
      } catch (error) {
        console.error("Erreur Prisma :", error);
        throw error;
      }
    }

    //return {message:string, reponse : boolean, result:[{myuser_id, first_name, family_name}]
    static async getWaitersABookList (bookGroupId: number) {
      try{
        const waitersList = await prisma.bookEvent.findMany({
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
            return {message: "Personne dans la liste d'attente", reponse : null, result : []};
        }

        if (waitersList.length === 0) {
            return {message: "Personne dans la liste d'attente", reponse : false, result : []};
        }

        const formattedList = waitersList.map((waiter) => ({
            userId: waiter.user.userId,
            userFirstName: waiter.user.userFirstName,
            userFamilyName: waiter.user.userFamilyName,
        }));

        return {message: "Liste d'attente trouvée" ,reponse : true, result : formattedList};
      } catch (error) { 
        console.error("Erreur Prisma :", error);
        throw error;
      }
    }

//return message, reponse, result :rang (number) d'un user dans liste d'attente ou Null si absent de la liste
    static async getWaitingListRenkUser(bookGroupId :number, userId:number){
        const waitingListBook = await LibraryModel.getWaitersABookList(bookGroupId);
        
        let waitingListRank = null;
        let waitingListCounter = 0;
        let searching = true;
        if(waitingListBook.reponse){
            while ( searching && waitingListCounter < waitingListBook.result.length) {
                if(waitingListBook.result[waitingListCounter].userId === userId){
                    searching = false;
                    waitingListRank = waitingListCounter;
                }
                else {
                    waitingListCounter = waitingListCounter +1;
                }
            }
        }
        
        return waitingListRank;
    }

    //return {message:string, reponse : boolean, result:boolean}
    static async isABookBorrowed(bookGroupId: number) {
      try{
        const isBookBorrowed = await prisma.bookEvent.findFirst({
          where: {
            bookGroupId: bookGroupId,
            bookEventType: 1,
          },
          select: {
            bookEventId: true,
          }
        })

        return {message: "réussite" ,reponse : true, result: isBookBorrowed?.bookEventId ? 1 : 0};
      } catch (error) {
        console.error("Erreur Prisma :", error);
        throw error;
      }
    }

    static async isABookReserved(bookGroupId:number) {
      try{
        const bookReserved = await prisma.bookEvent.findFirst({
            where: {  
                bookGroupId: bookGroupId,
                bookEventType: 4, // type 4 corresponds to reserved books
            },
            select: {
                bookGroupId: true,
            }
        })
        if (!bookReserved) {
            return {message: "Pas de réservation pour ce livre", reponse : false, result : null};
        }
        return {message: "réussite" ,reponse : true, result : bookReserved};
      }
      catch (error) {
        console.error("Erreur Prisma :", error);
        throw error;
      }
    }

    //return {boolean}
    static async  isBookReservedEnableToBorrow(bookGroupId: number, userId: number) {
        try {
          const bookReservedBorrowed = await LibraryModel.isABookBorrowed(bookGroupId);
          if(bookReservedBorrowed.result === 1){  //le livre est déjà emprunté
            return false;
          }
          else { //le livre n'est pas emprunté, on récupère la liste d'attente
            const listWaiters = await LibraryModel.getWaitersABookList(bookGroupId);
            if(listWaiters.reponse !== null && listWaiters.reponse && listWaiters.result[0].userId === userId) {
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

  static async  addBookInGroupLibrary(book : BookToGroupListType, bookWork : number) {
    try{
      const addBook = await prisma.bookGroup.create({
        data: {
          groupId: book.groupId,
          bookId: book.bookId,
          location: book.bookLocation,
          onWork: bookWork ===1 ? true : false,
          dateAdd: new Date(),
        },
      });
      if (!addBook) {
        return ({message: "LibraryModel, addBookInGroupLibrary, erreur", reponse : null, result: null})
      }
      return ({message: "réussite" ,reponse : true, result: addBook.bookGroupId});
    }
    catch (error) {
      console.error("Erreur dans addBookInGroupLibrary :", error);
      throw error;
    }    
}

static async borrowABook(userId:number,bookGroupId:number){
  //savoir s'il s'agit d'un livre réservé
  const isTheBookReserved = async () => {
    try {
      const result = await LibraryModel.getBookReservedByUser(userId);
      let isReserved = false;
        
      if (result.result && result.result.bookGroupId === bookGroupId) {
        isReserved = true;
      } 
        
      return isReserved;
    } catch (error) {
      console.error("Erreur dans checkIsReserved :", error);
      return { message: "Erreur lors de la vérification", reponse: false };
    }
  }; 
  const checkBookReservation = async () => {
    try {
      const isBookReserved = await isTheBookReserved();
      if (isBookReserved) {
        const bookUpdate = await prisma.bookEvent.updateMany({
	      where: {
		      bookGroupId: bookGroupId,
          userId: userId,
          bookEventType: 4,
	      },
	      data: { bookEventType: 1, bookEventDate: new Date() }, 
        })

        if (bookUpdate.count === 0) {
          console.warn("Aucun événement mis à jour.");
          return {message: "Pas de réservation pour ce livre", reponse : false, result : null};
        } 
        if (bookUpdate.count > 1) {
          console.log(`${bookUpdate.count} événement(s) mis à jour.`);
          return {message: `${bookUpdate.count} événement(s) mis à jour.`, reponse : false, result : null};
        }
        return {message: `${bookUpdate.count} événement(s) mis à jour.`, reponse : true, result : null};

      } else {
        //on crée un évènement d'emprunt
        const bookBorrow = await prisma.bookEvent.create({
          data: {
            userId: userId,
            bookGroupId: bookGroupId,
            bookEventType: 1,
            bookEventDate: new Date(),
          }
        })
        if (!bookBorrow) {
          console.warn("Aucun événement mis à jour.");
          return {message: "impossible d'emprunter le livre", reponse : false, result : null};
        }
        return {message: "réussite" ,reponse : true, result : null};
      }
    } catch (error) {
      console.error("Erreur dans borrowABook :", error); 
    }
  }

  const myWork = checkBookReservation(); // Lance le tout
  return myWork
  }

  static async createBookInLibrary(book : BookToGroupListType) {
    try {
      const addBook = await prisma.book.create({
        data: {
          bookTitle: book.bookTitle,
          bookAuthor: book.bookAuthor,
          bookPublisher: book.bookPublisher,
          bookIsbn: book.bookIsbn,
        },
      });
      if (!addBook) {
        return ({message: "LibraryModel, createBookInLibrary, erreur", reponse : null, result: null})
      }
      return ({message: "réussite" ,reponse : true, result: addBook.bookId});
    }
    catch (error) {
      console.error("Erreur dans createBookInLibrary :", error);
      throw error;
    }
  }    

  //annuler l'emprunt d'un livre
    //return : message, reponse
    static async removeBorrowABook(userId : EntierPositifType, bookGroupId : EntierPositifType) {
      try {
        const removeBorrow = await prisma.bookEvent.deleteMany({
          where: {
            userId: userId,
            bookGroupId: bookGroupId,
            bookEventType: 1,
          },
        });

        if(removeBorrow.count === 0) {
          return ({message: "libraryModel, removeBoorowABook, erreur", reponse : false})
        }
        return ({message: "réussite" ,reponse : true})
      }
      catch (error){
        console.error("Erreur dans removeBorrowABook :", error);
      }
    }
  
  static async  removeReserveABook(userId :EntierPositifType, bookGroupId : EntierPositifType) {
    try {
        const removeReserve = await prisma.bookEvent.deleteMany({
          where: {
            userId: userId,
            bookGroupId: bookGroupId,
            bookEventType: 4,
          },
        });

        if(removeReserve.count === 0) {
          return ({message: "libraryModel, removeBoorowABook, erreur", reponse : false})
        }
        return ({message: "réussite" ,reponse : true})
      }
      catch (error){
        console.error("Erreur dans removeReserveABook :", error);
        throw error;
      }
    }

  static async reserveABook(userId : EntierPositifType, bookGroupId : EntierPositifType) {
    try{
      const workReserve = await prisma.bookEvent.create({
        data: {
          userId: userId,
          bookGroupId: bookGroupId,
          bookEventType: 4,
          bookEventDate: new Date(),
        }
      })

      if(!workReserve) {
        return ({message: "libraryModel, reserveABook, erreur", reponse : null})
      }
      return ({message: "réussite" ,reponse : true, result: workReserve.bookEventId})
      
    }
    catch (error) {
      console.error("Erreur dans LibraryModel reserveABook :", error);
      throw error;
    }
}
  //return : message, reponse ('boolean)
    static  async returnABook(userId : EntierPositifType, bookGroupId : EntierPositifType, isReaded: boolean) {
      const readedCode = isReaded? 2 : 3;
      
      try {
        const returnBook = await prisma.bookEvent.updateMany({
          where:{
            userId: userId,
            bookGroupId: bookGroupId,
            bookEventType: 1,
          },
          data: {
            bookEventType: readedCode,
            bookEventDate: new Date(),
          },
        });

        if(returnBook.count === 0) {
          return ({message: "libraryModel, returnABook, erreur", reponse : false})
        }
        return ({message: "réussite" ,reponse : true})
      
      }
      catch (error){
        console.error("Erreur dans returnABook :", error);
        throw error;
      }
    }
        
  

}