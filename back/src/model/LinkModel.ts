import { LinkDataSchema, LinksDataSchema } from '@shared/schema/link.schema';
import { prisma } from '../lib/prisma/client';

export default class LinkModel {
  static async getTeacherLinksListData(userId: number) {

    try{
      const datas = await prisma.link.findMany({
        where: {
            OR: [
                { linkUserPermission: { some: { userId: userId } } },
                { linkUserPermission: { none: {} } }, // lien public
            ],
            linkType: { in: ['all', 'teacher'] }        
        },
        select: {
            linkId : true,
            linkName : true,
            linkTitleFr : true,
            linkTitleBr : true,
            linkFullNameFr : true,
            linkFullNameBr : true,
            linkRedirection : true,
            linkIcon : true,
            linkMatter : true,
            linkDescriptionFr : true,
            linkDescriptionBr : true,
            linkType : true,
            // is_private
            linkUserPermission: {            
                select: {
                    userId: true
                }
            },
            // is_associated
    userLinks: {
      where: {
        userId: userId
      },
      select: {
        userId: true
      }
    },

    // total_users_with_access
    _count: {
      select: {
        linkUserPermission: true
      }
    }
  
        }
      });
    if(!datas) {
        return {message : "nolink", reponse : false, result : []}
    }
    //on traite les données pour correspondre à LinkDataType
    const myDatas = datas.map((l : any) => ({
        linkId: l.linkId,
        linkName: l.linkName,
        titleFr: l.linkTitleFr === "" ? null : l.linkTitleFr,
        titleBr: l.linkTitleBr === "" ? null : l.linkTitleBr,
        fullnameFr: l.linkFullNameFr === "" ? null : l.linkFullNameFr,
        fullnameBr: l.linkFullNameBr === "" ? null : l.linkFullNameBr,
        redirection: l.linkRedirection,
        icon: l.linkIcon,
        matter: l.linkMatter,
        descriptionFr: l.linkDescriptionFr === "" ? null : l.linkDescriptionFr,
        descriptionBr: l.linkDescriptionBr === "" ? null : l.linkDescriptionBr,
        typeLink: l.linkType,
        isPrivate: l.linkUserPermission.length >0 ? true : false,
        isAssociated: l.userLinks.length >0 ? true : false,
        totalUsersWithAccess: l._count.linkUserPermission,
    }));

    //on valide les données avec Zod
    const parsed = LinksDataSchema.safeParse(myDatas);
    
    if (!parsed.success) {
        console.error("Validation Zod échouée :", parsed.error.errors);
        throw new Error("Données utilisateur invalides");
    }
    
    return {
        message: "Liens récupérés avec succès",
          reponse: true,
          result: myDatas,
        };
    } catch (error) {
    console.error("Erreur Prisma :", error);
    throw error;
  }
  }

  static async getGroupLinksListData(userId: number, groupId: number) {

    try{
      const datas = await prisma.link.findMany({
        where: {
            OR: [
                { linkUserPermission: { some: { userId: userId } } },
                { linkUserPermission: { none: {} } }, // lien public
            ],
            linkType: { in: ['all', 'student'] }        
        },
        select: {
            linkId : true,
            linkName : true,
            linkTitleFr : true,
            linkTitleBr : true,
            linkFullNameFr : true,
            linkFullNameBr : true,
            linkRedirection : true,
            linkIcon : true,
            linkMatter : true,
            linkDescriptionFr : true,
            linkDescriptionBr : true,
            linkType : true,
            // is_private
            linkUserPermission: {            
                select: {
                    userId: true
                }
            },
            // is_associated
            groupLinks: {
            where: {
                groupId: groupId
            },
            select: {
                groupId: true
            }
            },

            // total_users_with_access
            _count: {
            select: {
                linkUserPermission: true
            }
            }
  
        }
      });
    if(!datas) {
        return {message : "nolink", reponse : false, result : []}
    }
    //on traite les données pour correspondre à LinkDataType
    const myDatas = datas.map((l : any) => ({
        linkId: l.linkId,
        linkName: l.linkName,
        titleFr: l.linkTitleFr === "" ? null : l.linkTitleFr,
        titleBr: l.linkTitleBr === "" ? null : l.linkTitleBr,
        fullnameFr: l.linkFullNameFr === "" ? null : l.linkFullNameFr,
        fullnameBr: l.linkFullNameBr === "" ? null : l.linkFullNameBr,
        redirection: l.linkRedirection,
        icon: l.linkIcon,
        matter: l.linkMatter,
        descriptionFr: l.linkDescriptionFr === "" ? null : l.linkDescriptionFr,
        descriptionBr: l.linkDescriptionBr === "" ? null : l.linkDescriptionBr,
        typeLink: l.linkType,
        isPrivate: l.linkUserPermission.length >0 ? true : false,
        isAssociated: l.groupLinks.length >0 ? true : false,
        totalUsersWithAccess: l._count.linkUserPermission,
    }));

    //on valide les données avec Zod
    const parsed = LinksDataSchema.safeParse(myDatas);
    
    if (!parsed.success) {
        console.error("Validation Zod échouée :", parsed.error.errors);
        throw new Error("Données utilisateur invalides");
    }
    
    return {
        message: "Liens récupérés avec succès",
          reponse: true,
          result: myDatas,
        };
    } catch (error) {
    console.error("Erreur Prisma :", error);
    throw error;
  }
  }
}