// test.ts
import { prisma } from '../src/lib/prisma/client';
import LibraryModel  from '../src/model/LibraryModel';

async function main() {
  const testReq = await prisma.book.create({
        data: {
          bookTitle: "1a",
          bookAuthor: null,
          bookPublisher: undefined,
          bookIsbn: '0',
        },
      });

// const testReq = await LibraryModel.getNbReadedBook(373, 38);
  console.log(testReq);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
