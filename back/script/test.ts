// test.ts
import { prisma } from '../src/lib/prisma/client';
import LibraryModel  from '../src/model/LibraryModel';

async function main() {
  const schoolId = 1;
  
  const testReq =  await prisma.group.findMany({
      where: { 
        classroom :{
          schoolId : schoolId,
        },
        groupPrincipal : true,
      } ,
      select: {
        groupId: true,
        groupName: true,
        groupPrincipal : true,
        }
        })
  console.log(testReq)

}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
