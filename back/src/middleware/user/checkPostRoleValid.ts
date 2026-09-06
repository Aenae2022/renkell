import { UserRoleSchema } from "@shared/schema/role.schema";
import { UserSessionConnectSchema } from "@shared/schema/user.schema";
import UserModel from "@srcBack/model/UserModel";
import { Request, Response, NextFunction } from "express";

export const checkPostRoleValid = async(
    req: Request,
  res: Response,
  next: NextFunction
) : Promise<void> => {
    const {role} = req.body;

    if (!role) {
      res.status(401).json({ message: "Non authentifié." });
      return;
    }

    const parsedRole = UserRoleSchema.safeParse(role);
    if (!parsedRole.success) {
      res.status(400).json({ message: "Role invalide." });
      return;
    }

    req.body = parsedRole.data;

    const roleValid = await UserModel.doesRoleExist(role);
    if(!roleValid){
      res.status(400).json({ message: "Role introuvable." });
      return;
    }


    next(); // continuer si tout est OK
  };



