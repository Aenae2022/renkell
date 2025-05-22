import { prisma } from '../../../../src/lib/prisma/client'


interface SchoolParams {
  schoolName: string;
  schoolRef: string;
}

export async function createSchool(params: SchoolParams) {
  const schoolData: any = {
    schoolName: params.schoolName,
    schoolRef: params.schoolRef,
  };

  const newSchool = await prisma.school.create({
    data: schoolData,
  });

  console.log('Created school:', newSchool);
}
