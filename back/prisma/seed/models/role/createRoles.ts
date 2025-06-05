import { prisma } from '@srcBack/lib/prisma/client'


export async function createRoles() {
  const data: { roleName: string }[] = [
  { roleName: 'STUDENT' },
  { roleName: 'TEACHER' },
  { roleName: 'SCHOOL_ADMIN' },
  { roleName: 'MASTER_SCHOOL' }
];
  const newRoles = await prisma.role.createMany({
    data,
    skipDuplicates:true
  });

  console.log('Created roles:', newRoles);
}


