import { StringNameSchema } from "@shared/schema/fields/stringName.schema";
import { Request, Response, NextFunction } from "express";
import convertNomPropre from "../../../utils/convertNomPropre";

export const checkPostUserFamilyName = async(
    req: Request,
  res: Response,
  next: NextFunction
) : Promise<void> => {
    const {userFamilyName} = req.body;

    if (!userFamilyName) {
      res.status(401).json({ message: "userFamilyName manquant" });
      return;
    }

    const parsedRole = StringNameSchema.safeParse(userFamilyName);
    if (!parsedRole.success) {
      res.status(400).json({ message: "userFamilyName invalide." });
      return;
    }

    const formattedName = convertNomPropre(userFamilyName);
    req.body.userFamilyName = formattedName;


    next(); // continuer si tout est OK
  };
export default checkPostUserFamilyName


