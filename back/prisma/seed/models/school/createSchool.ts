// prisma/seed/createSchool.ts
import { prisma } from '../../../../src/lib/prisma/client'

export async function createSchool(name: string) {
  const newSchool = await prisma.school.create({
    data: {
      schoolName:name,
    },
  });
  console.log('Created school:', newSchool);
}