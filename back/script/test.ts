// test.ts
import { prisma } from '../src/lib/prisma/client';
import LibraryModel  from '../src/model/LibraryModel';

async function main() {
  const testReq = await prisma.bookEvent.findFirst({
              where: {
                  bookGroupId: 490,
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
// const testReq = await LibraryModel.getNbReadedBook(373, 38);
  console.log(testReq);

  // Tu peux tester une autre requête ici si tu veux
  // const newUser = await prisma.user.create({ data: { name: "Alice", email: "alice@example.com" } });
  // console.log(newUser);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
