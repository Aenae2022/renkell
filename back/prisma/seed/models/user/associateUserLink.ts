import { prisma } from '../../../../src/lib/prisma/client'


interface LinksUserParams {
  userId: number;
  linkId: number;
}

export async function createAssociationUserLink(params: LinksUserParams) {
  const associationData: any = {
    userId: params.userId,
    linkId: params.linkId,
  };
  const newAssociation = await prisma.linkUser.create({
    data: associationData,
  });

  console.log('Created association user-link :', newAssociation);
}
