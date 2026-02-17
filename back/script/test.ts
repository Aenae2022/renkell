// test.ts
import { prisma } from '../src/lib/prisma/client';
import LibraryModel  from '../src/model/LibraryModel';

async function main() {
  const groupId = 1;
  const period= {periodStart : new Date('2026-01-04'), periodEnd : new Date('2026-02-11')};
  const statsBooksSearch = await prisma.bookGroup.findMany({
  where: {
    groupId: groupId,
    bookEvents: {
      some: {
        bookEventDate: {
          gte: period.periodStart,
          lte: period.periodEnd,
        }
      }
    }
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
    }
  },
  orderBy: {
    book: {
      bookTitle: 'asc'
    }
  }
});
    console.dir(statsBooksSearch, { depth: null, colors: true });

}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
