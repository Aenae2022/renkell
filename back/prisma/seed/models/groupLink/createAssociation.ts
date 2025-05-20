import { prisma } from '../../../../src/lib/prisma/client'


interface GroupLinkParams {
  groupId: number;
  linkId: number;
}

export async function createAssociation(params: GroupLinkParams) {
  const associationData: any = {
    groupId: params.groupId,
    linkId: params.linkId,
  };
  const newAssociation = await prisma.GroupLink.create({
    data: associationData,
  });

  console.log('Created association group-link :', newAssociation);
}
