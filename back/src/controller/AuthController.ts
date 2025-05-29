//back/scr/controller/AuthController.ts
import { Request, Response } from "express";
import UserModel from "../model/UserModel";
import GroupModel from "../model/GroupModel"
import bcrypt from "bcrypt";
import { UserDatasConnectSchema, type UserDatasConnectType } from "@shared/schema/user.schema";
// import dotenv from "dotenv";

import  {toUserSession} from "../../utils/changeType"
// dotenv.config();


export default class AuthController {

    static async validateConnection(
    req: Request,
    res: Response) {
        const { userPseudo, userPsswd } = req.body;
    
    try {

        //on récupère les datas de user si l'utilisateur existe
        const validatedUser = await UserModel.getUserByPseudo(userPseudo);
        if (!validatedUser || validatedUser.reponse === null) {
           res.status(400).json({ message: validatedUser.message || "header.login.badIdentification", reponse:null });
           return
        }

        const parseResult = UserDatasConnectSchema.safeParse(validatedUser.result);

        if (!parseResult.success) {
            console.error("Erreur de validation Zod :", parseResult.error.format());
            res.status(500).json({ message: "Erreur interne de validation" });
            return
        }

        const myUser = parseResult.data; // ✅ bien typé
        
        if(myUser.userPsswd === null || myUser.userPsswd === undefined) {
            res.status(400).json({ message: "header.login.badIdentification", reponse: null });
            return 
        }

        // Vérifier le mot de passe
         let isMatch: boolean;
        try {
            isMatch = await bcrypt.compare(userPsswd, myUser.userPsswd);
        } catch (err) {
            console.error("Erreur de comparaison :", err);
            res.status(500).json({ message: "Erreur du serveur motdepasse" });
            return;
        }

        if (!isMatch) {
            res.status(400).json({ message: "header.login.badIdentification", reponse:null });
            return;
        }           

        //modificatin des données pour stockage en session
        const userSession = toUserSession(myUser);
       
        req.session.user = userSession;

      res.status(200).json({
        message: "header.login.goodIdentification",
        reponse: true,
      });
      

       
      } catch (error) {
        console.error("Erreur dans le contrôleur :", error);
         res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
         return
      }
    } 

    static async logout(req: Request, res: Response) {
      const userDatas = req.session.user
      const refSchool = userDatas?.userSchool ? userDatas.userSchool.schoolRef : 0
      let redirection = '/degemer/'+refSchool
      if(userDatas && userDatas.groupsP.length > 0){
        const refClassroomSearch = await GroupModel.getClassroomRefByGroupId(userDatas.groupsP[0].groupId)
        if(refClassroomSearch.reponse){
          redirection = redirection + '/c/'+refClassroomSearch.result
        }
      }
      
  req.session.destroy(() => {
    res.clearCookie("connect.sid"); // Nom par défaut du cookie
    res.json({ success: true, result:redirection });
  });
};

static getSession(req: Request, res: Response){
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.json({ user: null });
  }
};
}



// router.post("/getClassroom", async (req, res) => {
//     const { groupPId } = req.body;
//     const classroomResponse = await GroupController.getClassroomOfPrincipalGroup(groupPId);
//     if (!classroomResponse) {
//         return res.status(404).json({ message: "classroom non trouvée" });
//     }
    
//     return res.status(200).json({ message: classroomResponse.message, response: classroomResponse.reponse});
// });

// router.post("/refresh-token", (req, res) => {
//     const oldToken = req.headers.authorization?.split(" ")[1];
  
//     if (!oldToken) {
//       return res.status(401).json({ message: "Token manquant" });
//     }
  
//     try {
//       const decoded = jwt.verify(oldToken, process.env.JWT_SECRET, { ignoreExpiration: true });
//       const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
//       return res.status(200).json({ token: newToken });
//     } catch (err) {
//       return res.status(403).json({ message: "Token invalide" });
//     }
//   });


