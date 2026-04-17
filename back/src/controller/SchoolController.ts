import { EntierPositifSchema } from "@shared/schema/fields/entierPositif.schema";
import { GroupInfoType, GroupMiniSchema, GroupMiniType } from "@shared/schema/group.schema";
import { UserRoleType } from "@shared/schema/role.schema";
import { UserDatasIdentitySchema, UserGroupBdType } from "@shared/schema/user.schema";
import GroupModel from "@srcBack/model/GroupModel";
import UserModel from "@srcBack/model/UserModel";
import { Request, Response } from "express";
export default class SchoolController {

static async getListGroupPrincipalBySchool(
    req: Request,
    res: Response) {
        const { user } = req.body;
    try {
        if(user.userSchool.schoolId === null || user.userSchool.schoolId === undefined) {   
            //TODO cas sans école
        }
        else {   
        const groupsDatas = await GroupModel.getGroupPrincipalBySchoolId(user.schoolId);
        if (groupsDatas.length === 0) {
            res.status(200).json({ message: "nogroup", reponse: false, result: [] });
            return;
        }
          
        //on valide les données avec Zod
        const parsedGroups = groupsDatas.map((group) => {
            const newGroup : GroupMiniType = {
                groupId: group.groupId,
                groupName: group.groupName}
            
            const parsed = GroupMiniSchema.safeParse(newGroup);
            if(!parsed.success){
                return ({groupId:0, groupName:"error"})
            }
            return newGroup
        })  
        
        res.status(200).json({message : 'réussite', reponse: true, result: parsedGroups});
          return;
        }
    }
    catch (error) {
        console.error("Erreur dans le contrôleur :", error);
        res.status(500).json({ message: "Erreur serveur schoolController, getListGroupPrincipalBySchool", reponse: null, result: [] });
        return
    }
}

static async getUserIdentity(
    req: Request,
    res: Response) {
  const { userId } = req.body;
  try {
    const userDatas = await UserModel.getUserIdentity(userId);
    if (!userDatas.reponse) {
        res.status(200).json(userDatas);
    }
    //Reconstruire le tableau des groupes :
    const groupes = userDatas.result!.userGroups.map((g : UserGroupBdType) => ({
      groupId : g.group.groupId,
      groupName : g.group.groupName,
      principal : g.principal
    }));
    // Séparer groupes principal et secondaire 
    const groupesPrincipaux = groupes.filter((g : GroupInfoType) => g.principal)
    const groupesSecondaires = groupes.filter((g : GroupInfoType) => !g.principal)
    //construire le tableau des roles
    const roles = userDatas.result!.userRoles.map((r : {roles : UserRoleType}  ) => ({
      roleId : r.roles.roleId,
      roleName : r.roles.roleName,
    }))
        // On reconstruit l'objet final
    const result = {
      userId : userDatas.result!.userId,
      userFamilyName: userDatas.result!.userFamilyName,
      userFirstName:  userDatas.result!.userFirstName,
      userMail : userDatas.result!.userMail,
      userPsswd:      userDatas.result!.userPsswd,
      userPseudo:     userDatas.result!.userPseudo,
      userRoles:      roles,
      userIcon:       userDatas.result!.userIcon,
      grade:          userDatas.result!.grade,              // correspond à GradeSchema
      userGroups: groupes,
      groupsP : groupesPrincipaux,
      groupsS: groupesSecondaires,
    };
    
    //on valide les données avec Zod
    const parsed = UserDatasIdentitySchema.safeParse(result);
    
    if (!parsed.success) {
        console.error("Validation Zod échouée :", parsed.error.errors);
      res.status(200).json({ message: "Données utilisateur invalides", reponse: false, result: "Données utilisateur invalides" });
      return
    }
    res.status(200).json({
      message: "User récupéré avec succès",
      reponse: true,
      result: parsed.data,
    });
    return
  }
  catch(error){
    console.error("Erreur dans le contrôleur :", error);
    res.status(500).json({ message: "Erreur serveur schoolController, getUserIdentity", reponse: null, result: error });
    return
  }
  }

static async updateFamilyName(
    req: Request,
    res: Response) {
        const { userId, userFamilyName } = req.body;
    try {
        const result = await UserModel.updateFamilyName(userId, userFamilyName);

        if (result === 0) {
          res.status(400).json({message:"noUpdateFamilyName", reponse: false, result:"noUpdateFamilyName"})
          return
        }
          
        //on valide les données avec Zod
        const parsedResult = EntierPositifSchema.safeParse(result);
        if(!parsedResult.success){
          res.status(200).json({message:"userId invalide", reponse: false, result:"userId invalide"})
          return 
        }
        res.status(200).json({message : 'réussite', reponse: true, result: result});
          return;
    }
    
    catch (error) {
        console.error("Erreur dans le contrôleur :", error);
        res.status(500).json({ message: "Erreur serveur schoolController, getListGroupPrincipalBySchool", reponse: null, result: [] });
        return
    }
}

static async updateFirstName(
    req: Request,
    res: Response) {
        const { userId, userFirstName } = req.body;
    try {
        const result = await UserModel.updateFirstName(userId, userFirstName);

        if (result === 0) {
          res.status(400).json({message:"noUpdateFirstName", reponse: false, result:"noUpdateFirstName"})
          return
        }
          
        //on valide les données avec Zod
        const parsedResult = EntierPositifSchema.safeParse(result);
        if(!parsedResult.success){
          res.status(200).json({message:"userId invalide", reponse: false, result:"userId invalide"})
          return 
        }
        res.status(200).json({message : 'réussite', reponse: true, result: result});
          return;
    }
    
    catch (error) {
        console.error("Erreur dans le contrôleur :", error);
        res.status(500).json({ message: "Erreur serveur schoolController, getListGroupPrincipalBySchool", reponse: null, result: [] });
        return
    }
}


static async updateGrade(
    req: Request,
    res: Response) {
        const { userId, gradeId } = req.body;
    try {
        const result = await UserModel.updateGrade(userId, gradeId);

        if (result.userId === 0) {
          res.status(400).json({message:"noUpdateGrade", reponse: false, result:"noUpdateGrade"})
          return
        }
          //TODO
        //on valide les données avec Zod
        const parsedResult = EntierPositifSchema.safeParse(result.userId);
        if(!parsedResult.success){
          res.status(200).json({message:"userId invalide", reponse: false, result:"userId invalide"})
          return 
        }
        res.status(200).json({message : 'réussite', reponse: true, result: result});
          return;
    }
    
    catch (error) {
        console.error("Erreur dans le contrôleur :", error);
        res.status(500).json({ message: "Erreur serveur schoolController, getListGroupPrincipalBySchool", reponse: null, result: [] });
        return
    }
}

}

