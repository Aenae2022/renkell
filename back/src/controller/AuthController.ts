import { Request, Response } from "express";
import UserModel from "../model/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserDatasConnectSchema } from "@shared/schema/user.schema";
import dotenv from "dotenv";
import {generateToken} from "../../utils/jwt";
dotenv.config();


export default class AuthController {

    static async validateConnection(
    req: Request,
    res: Response) {
        const { userPseudo, userPsswd } = req.body;
    
    try {

console.log("Req body brut :", req.body);
        //on récupère les datas de user si l'utilisateur existe
        const validatedUser = await UserModel.getUserByPseudo(userPseudo);
        if (!validatedUser || validatedUser.reponse === null) {
           res.status(400).json({ message: validatedUser.message || "header.login.badIdentification" });
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
            res.status(400).json({ message: "header.login.badIdentification2" });
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
            res.status(400).json({ message: "header.login.badIdentification3" });
            return;
        }           

        // Générer un JWT pour l'utilisateur
        const token = generateToken(myUser.userId);
  
         res.status(200).json({ message: "header.login.goodIdentification4", 
            reponse: true, 
            result: {
                myUser,
                token,
            }});
        return
      } catch (error) {
        console.error("Erreur dans le contrôleur :", error);
         res.status(500).json({ message: "Erreur serveur", reponse: null, result: [] });
         return
      }
    } 

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


