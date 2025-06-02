import { StringNameGroupSchema } from '@shared/schema/fields/stringNameGroup.schema';
import { prisma } from '../lib/prisma/client';
import { GroupsAllSchema, UserDatasConnectSchema, UserDatasConnectType } from "@shared/schema/user.schema";
import { type GroupInfoType } from '@shared/schema/group.schema';
import { UserInfo } from 'os';
import { type UserGroupBdType } from '@shared/schema/user.schema';


class UserModel {

  static async doesUserPseudoExist(userPseudo: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { userPseudo: userPseudo },
      select: { userPseudo: true },
    });
    return !!user;
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
        userType: true,
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
        }
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
    //TODO modif por tuiliser groupes
    const groupesPrincipaux = groupes.filter((g : GroupInfoType) => g.principal)
    
    const groupesSecondaires = groupes.filter((g : GroupInfoType) => !g.principal)

    // On reconstruit l'objet final
    const result = {
      userId : userDatas.userId,
      userFamilyName: userDatas.userFamilyName,
      userFirstName:  userDatas.userFirstName,
      userPsswd:      userDatas.userPsswd,
      userPseudo:     userDatas.userPseudo,
      userType:       userDatas.userType,
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
}

export default UserModel;