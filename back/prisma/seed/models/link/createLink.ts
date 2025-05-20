
import { prisma } from '../../../../src/lib/prisma/client'


interface LinkParams {
  linkName :string;           
  linkTitleFr?:string; // Optionnel car il a une valeur par défaut dans le schéma Prisma
  linkTitleBr?:string; // Optionnel car il a une valeur par défaut dans le schéma Prisma
  linkFullNameFr?:string; // Optionnel car il a une valeur par défaut dans le schéma Prisma
  linkFullNameBr?:string; // Optionnel car il a une valeur par défaut dans le schéma Prisma
  linkRedirection:string;
  linkIcon:string;
  linkMatter:string;
  linkDescriptionFr?:string; // Optionnel car il a une valeur par défaut dans le schéma Prisma
  linkDescriptionBr?:string; // Optionnel car il a une valeur par défaut dans le schéma Prisma
  linkType:string;
}

export async function createLink(params: LinkParams) {
  const linkData: any = {
    linkName: params.linkName,
    linkRedirection: params.linkRedirection,
    linkIcon: params.linkIcon,
    linkMatter: params.linkMatter,
  };

  if (params.linkTitleFr !== undefined) {
    linkData.linkTitleFr = params.linkTitleFr;
  }

  if (params.linkTitleBr !== undefined) {
    linkData.linkTitleBr = params.linkTitleBr;
  }
  if (params.linkFullNameFr !== undefined) {
    linkData.linkFullNameFr = params.linkFullNameFr;
  }
    if (params.linkFullNameBr !== undefined) {
        linkData.linkFullNameBr = params.linkFullNameBr;
    }
    if (params.linkDescriptionFr !== undefined) {
        linkData.linkDescriptionFr = params.linkDescriptionFr;
    }
    if (params.linkDescriptionBr !== undefined) {
        linkData.linkDescriptionBr = params.linkDescriptionBr;
    }
    if (params.linkType !== undefined) {
        linkData.linkType = params.linkType;
    }

  const newLink = await prisma.link.create({
    data: linkData,
  });

  console.log('Created link:', newLink);
}
