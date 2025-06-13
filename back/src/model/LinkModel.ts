import { LinksDataSchema } from '@shared/schema/link.schema';
import { prisma } from '../lib/prisma/client';

interface AssociateLinkParams {
  refId: number; // Identifiant de l'utilisateur ou du groupe   
  linkId: number; // Identifiant du lien
  type: 'user' | 'group'; // Type de référence (utilisateur ou groupe)
  operation: 'addAssociation' | 'removeAssociation'; // Opération à effectuer
}
export default class LinkModel {

  //associer ou disassocier des liens
  static async  associateLink({refId, linkId, type, operation} : AssociateLinkParams) { //identifiant( user/group), id du lien, type (user/group), operation(addAssociation/removeAssociation)
    try {

      if(type === "group") {

        if(operation === 'addAssociation') {
          const groupAddAssociation = await prisma.groupLink.create({
            data: {
              groupId: refId,
              linkId: linkId,
            },
          });
          if(!groupAddAssociation) {
            return {message : "échec de l'association", reponse : false}
          }
          return {message : "association réussie", reponse : true}
        }

        if(operation === 'removeAssociation') {
          const groupDelAssociation = await prisma.groupLink.delete({
            where: { 
              groupId_linkId: {
                groupId: refId,
                linkId: linkId,
              },
            }
          });

          if(!groupDelAssociation) {
            return {message : "échec de la suppression", reponse : false}
          }
          return {message : "suppression réussie", reponse : true}
              
        }
      }

      if(type === "user") {

        if(operation === 'addAssociation') {
          const userAddAssociation = await prisma.linkUser.create({
            data: {
              userId: refId,
              linkId: linkId,
            },
          });
          if(!userAddAssociation) {
            return {message : "échec de l'association", reponse : false}
          }
          return {message : "association réussie", reponse : true}
        }

        if(operation === 'removeAssociation') {
          const userDelAssociation = await prisma.linkUser.delete({
            where: { 
              userId_linkId: {
                userId: refId,
                linkId: linkId,
              },
            }
          });

          if(!userDelAssociation) {
            return {message : "échec de la suppression", reponse : false}
          }
          return {message : "suppression réussie", reponse : true}
              
        }
      }
    } catch (error) {
      console.error("Erreur Prisma :", error);
      throw error;
    }
  }
  
    
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