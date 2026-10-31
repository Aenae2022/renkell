import { prisma } from '../lib/prisma/client';

class DomaineModel {
  static async doesDomaineExist(domaine: string): Promise<boolean> {

    const domaineSearch = await prisma.domaine.findUnique({
      where: { id: domaine },
      select: { id: true },
    });
    return !!domaineSearch;
  }

  

  

}

export default DomaineModel;
