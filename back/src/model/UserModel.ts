import { StringNameGroupSchema } from '@shared/schema/fields/stringNameGroup.schema';
import { prisma } from '../lib/prisma/client';
import { GroupsAllSchema, UserDatasConnectSchema, UserDatasConnectType, UserMiniListSchema } from "@shared/schema/user.schema";
import { type GroupInfoType } from '@shared/schema/group.schema';
import { UserInfo } from 'os';
import { type UserGroupBdType } from '@shared/schema/user.schema';
import { type LinkShortType } from '@shared/schema/link.schema';


class UserModel {

  static async doesUserPseudoExist(userPseudo: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { userPseudo: userPseudo },
      select: { userPseudo: true },
    });
    return !!user;
  }

  static async doesUserIdExist(userId: number): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { userId: userId },
      select: { userId: true },
    });
    return !!user;
  }

static async getOthersTeacherList(userId: number, schoolId: number) {

  try {
    const usersDatas  = await prisma.user.findMany({
      where: { userId: { not: userId }, userRoles: { some: { roleId: 2 } }, schoolId: schoolId},
      select: {
        userId: true,
        userFamilyName: true,
        userFirstName: true,
      },  
      orderBy: [
        {userFamilyName: "asc"},
        {userFirstName: "asc"},
      ]
    });

    if (!usersDatas) {
      return {
        message: "Il n'y a pas d'autre utilisateur",
        reponse: null,
        result: [],
      };
    }

    //Reconstruire le tableau des groupes :
    const usersList = usersDatas.map((g : {userId: number, userFamilyName: string, userFirstName: string}) => ({
      userId : g.userId,
      userName : g.userFirstName + " " + g.userFamilyName,     
    }));


    //on valide les données avec Zod
    const parsed = UserMiniListSchema.safeParse(usersList);

    if (!parsed.success) {
      console.error("Validation Zod échouée :", parsed.error.errors);
      throw new Error("Données invalides");
    }

    return {
      message: "Liste des utilisateurs récupérée avec succès",
      reponse: true,
      result: parsed.data,
    };

  } catch (error) {
    console.error("Erreur Prisma :", error);
    throw error;
  }
}

  static async getUserByPseudo(userPseudo: string) {
  try {
    console.log("Récupération des données de l'utilisateur :", userPseudo);
    console.log(JSON.stringify(userPseudo))
    const userDatas  = await prisma.user.findUnique({
      where: { userPseudo : userPseudo},
      select: {
        userId: true,
        userFamilyName: true,
        userFirstName: true,
        userPsswd: true,
        userPseudo: true,
        userIcon: true,
        grade: {
          select: {
            gradeId: true,
            gradeName: true,
          },
        },   
        school: {
          select: {
            schoolId: true,
            schoolName: true,
            schoolRef: true,
          },
        },
        userGroups: {
          select: {
            principal: true,
            group: {
              select: {
                groupId: true,
                groupName: true,
              }
            }
          },
          orderBy: {
            principal: "desc",
          }
        },
        userRoles: {
          select: {
            roles: {
              select: {
                roleId: true,
                roleName: true,
              }
            }
          },
          orderBy: {
            roles: {
              roleId: "asc",
            }
          }
        },

      },
      
    });

    if (!userDatas) {
      return {
        message: "user introuvable",
        reponse: null,
        result: [],
      };
    }

    //Reconstruire le tableau des groupes :
    const groupes = userDatas.userGroups.map((g : UserGroupBdType) => ({
      groupId : g.group.groupId,
      groupName : g.group.groupName,
      principal : g.principal
    }));
    // Séparer groupes principal et secondaire 
    const groupesPrincipaux = groupes.filter((g : GroupInfoType) => g.principal)
    const groupesSecondaires = groupes.filter((g : GroupInfoType) => !g.principal)

    //construire le tableau des roles
    const roles = userDatas.userRoles.map((r : any) => ({
        roleId : r.roles.roleId,
        roleName : r.roles.roleName,
      }))
    //définir le role actuel (role de plus bas niveau par défaut)
    const roleAct = roles[0];

    // On reconstruit l'objet final
    const result = {
      userId : userDatas.userId,
      userFamilyName: userDatas.userFamilyName,
      userFirstName:  userDatas.userFirstName,
      userPsswd:      userDatas.userPsswd,
      userPseudo:     userDatas.userPseudo,
      userRoles:      roles,
      roleActivated : roleAct,
      userIcon:       userDatas.userIcon,
      grade:          userDatas.grade,              // correspond à GradeSchema
      userSchool : userDatas.school,
      userGroups: groupes,
      groupsP : groupesPrincipaux,
      groupsS: groupesSecondaires,
    };

    //on valide les données avec Zod
    const parsed = UserDatasConnectSchema.safeParse(result);

    if (!parsed.success) {
      console.error("Validation Zod échouée :", parsed.error.errors);
      throw new Error("Données utilisateur invalides");
    }

    return {
      message: "User récupéré avec succès",
      reponse: true,
      result: parsed.data,
    };

  } catch (error) {
    console.error("Erreur Prisma :", error);
    throw error;
  }
}

 static async getUserLinksListByUserPseudo(userPseudo: string) {
    try {
      const userWithLinks = await prisma.user.findUnique({
        where: {
            userPseudo: userPseudo,
        },
        select: {
            userFamilyName: true,
            userFirstName : true,
            userGroups :{
              where :{
                principal : true,
              },
              select : {
                group : {
                  select : {
                    groupId : true,
                    groupName : true,
                    classroom : {
                      select : {
                        classroomRef : true
                      }
                    }
                  }
                }
              }
            },
            userLinks: {
              select: {
                link: { // ✅ on accède aux données du lien à travers `link`
                  select: {
                    linkId: true,
                    linkRedirection: true,
                    linkIcon: true,
                    linkTitleBr: true,
                    linkTitleFr: true,
                  },
                },
              },
              orderBy: {
                linkId: "asc",
              },
            }
        },
      });

    if (!userWithLinks) {
      return {
        message: "utilisateur introuvable",
        reponse: null,
        result: [],
      };
    }

    const myUserWithLinks = {
      userFamilyName: userWithLinks.userFamilyName,
      userFirstName: userWithLinks.userFirstName,
      userClassroomRef : userWithLinks.userGroups[0].group.classroom?.classroomRef,
      userLinks: userWithLinks.userLinks
    }
    if(myUserWithLinks.userLinks.length === 0) {
         return {
        message: "noLink",
        reponse: false,
        result: myUserWithLinks,
      };
    }
    return {
      message: "Liste des liens récupérée avec succès",
      reponse: true,
      result: myUserWithLinks,
    };
  } catch (error) {
    console.error("Erreur Prisma :", error);
    throw error;
  }
}

static async getUserLinksListByUserId(userId: number) {
    try {
      const userLinks = await prisma.user.findUnique({
        where: {
            userId: userId,
        },
        select: {
          userLinks: {
            select: {
              link: { // ✅ on accède aux données du lien à travers `link`
                select: {
                  linkId: true,
                  linkRedirection: true,
                  linkIcon: true,
                  linkTitleBr: true,
                  linkTitleFr: true,
                },
              },
            },
            orderBy: {
              linkId: "asc",
            },
          }
        },
      });

      if (!userLinks) {
        return {
          message: "utilisateur introuvable",
          reponse: null,
          result: [],
        };
      }

      if(userLinks.userLinks.length === 0) {
        return {
          message: "noLink",
          reponse: false,
          result: [],
        };
      }

      const userLinksList = userLinks.userLinks.map((l : { link: LinkShortType }) => ({
        linkId: l.link.linkId,
        linkRedirection: l.link.linkRedirection,
        linkIcon: l.link.linkIcon,
        linkTitleBr: l.link.linkTitleBr,
        linkTitleFr: l.link.linkTitleFr,
      })); 


    return {
      message: "Liste des liens récupérée avec succès",
      reponse: true,
      result: userLinksList,
    };
  } catch (error) {
    console.error("Erreur Prisma :", error);
    throw error;
  }
}
}

export default UserModel;