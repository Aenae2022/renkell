// test.ts
import { prisma } from '../src/lib/prisma/client';
import LibraryModel  from '../src/model/LibraryModel';

async function main() {
  const userId = 9;
  const locations = ["med", "", "", "per"]
  const period = {periodStart: "2025-04-07T00:00:00.000Z",periodEnd: "2025-07-07T00:00:00.000Z"}
  const book = {
            bookId: 1,
          }
  const testReq =  await prisma.bookEvent.findMany({
            where : {
              AND: [
                { userId : userId},
                { bookEventDate :
                  {
                    gte : period.periodStart,
                    lte : period.periodEnd
                  }
                },
              ]
            },                
            select : {
              bookGroupId : true,
              bookEventType : true,
              groupBook : {
                select : {
                  book : {
                    select : {
                      bookTitle : true,
                      bookAuthor: true,
                      bookId:true,
                    },
                  },
                }
              }
            }  
          })
  
  let count2 = 0;
  let count3 = 0;
  let count4 = 0;
  let books2 ="";
  let books3 ="";
  let books4 ="";
  testReq.map((data)=>{
    if(data.bookEventType === 2){
      books2 = books2!==""? books2 +", "+data.groupBook.book.bookTitle + (data.groupBook.book.bookAuthor !== null ? " - " + data.groupBook.book.bookAuthor : "") : data.groupBook.book.bookTitle + (data.groupBook.book.bookAuthor !== null ? " - " + data.groupBook.book.bookAuthor : "")
      count2++;
    }
    else if(data.bookEventType === 3){
      books3 = books3!==""? books3 +", "+data.groupBook.book.bookTitle + (data.groupBook.book.bookAuthor !== null ? " - " + data.groupBook.book.bookAuthor : "") : data.groupBook.book.bookTitle + (data.groupBook.book.bookAuthor !== null ? " - " + data.groupBook.book.bookAuthor : "")
      count3++;
    }
    else if(data.bookEventType === 4){
      books4 = books4!==""? books4 +", "+data.groupBook.book.bookTitle + (data.groupBook.book.bookAuthor !== null ? " - " + data.groupBook.book.bookAuthor : "") : data.groupBook.book.bookTitle + (data.groupBook.book.bookAuthor !== null ? " - " + data.groupBook.book.bookAuthor : "")
      count4++;
    }
  }
)
console.log('nbReaded : ', count2, ' concerned : ', books2)
console.log('nbNoRedaded : ', count3, ' concerned : ', books3)
console.log('nbWaiting : ', count4, ' concerned : ', books4)

}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
