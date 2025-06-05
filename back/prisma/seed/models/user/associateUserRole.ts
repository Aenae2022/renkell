import { prisma } from '../../../../src/lib/prisma/client'




export async function createAssociationUserRole() {
  const data: { roleId: number,  userId : number}[] = [
    {roleId : 2, userId : 1},
    {roleId : 3, userId : 1},
    {roleId : 4, userId : 1},
    {roleId : 2, userId : 23},
    {roleId : 1, userId : 22},
   
];
  const newRoles = await prisma.roleUser.createMany({
    data,
    skipDuplicates:true
  });

  console.log('Created roles:', newRoles);
}
