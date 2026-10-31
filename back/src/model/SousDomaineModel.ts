import { prisma } from '../lib/prisma/client';

class SousDomaineModel {
  static async doesSousDomaineExist(sousDomaine: string): Promise<boolean> {

    const sousDomaineSearch = await prisma.sousDomaine.findUnique({
      where: { id: sousDomaine },
      select: { id: true },
    });
    return !!sousDomaineSearch;
  }

  

  

}

export default SousDomaineModel;
