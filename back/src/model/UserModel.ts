import { StringNameGroupSchema } from '@shared/schema/fields/stringNameGroup.schema';
import { prisma } from '../lib/prisma/client';
import { UserDatasConnectSchema } from "@shared/schema/user.schema";

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
    const userDatas = await prisma.user.findUnique({
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
            groupId: "asc",
          }
        }
      }
    });

    if (!userDatas) {
      return {
        message: "user introuvable",
        reponse: null,
        result: [],
      };
    }

    // Séparer groupes principal et secondaire
    const groupesPrincipaux = userDatas.userGroups.filter(g => g.principal).map(g => ({
        groupId: g.group.groupId,
        groupName: g.group.groupName,
        principal: g.principal
      }));
    const groupesSecondaires = userDatas.userGroups.filter(g => !g.principal).map(g => ({
        groupId: g.group.groupId,
        groupName: g.group.groupName,
        principal: g.principal
      }));

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
      userGroups: userDatas.userGroups.map(g => ({
        groupId: g.group.groupId,
        groupName: g.group.groupName,
        principal: g.principal
      })),
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
    if(userWithLinks.userLinks.length === 0) {
         return {
        message: "noLink",
        reponse: false,
        result: userWithLinks,
      };
    }
    return {
      message: "Liste des liens récupérée avec succès",
      reponse: true,
      result: userWithLinks,
    };
  } catch (error) {
    console.error("Erreur Prisma :", error);
    throw error;
  }
}
}

export default UserModel;