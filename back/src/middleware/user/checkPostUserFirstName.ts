import { StringNameSchema } from "@shared/schema/fields/stringName.schema";
import { Request, Response, NextFunction } from "express";
import convertNomPropre from "../../../utils/convertNomPropre";

export const checkPostUserFirstName = async(
    req: Request,
  res: Response,
  next: NextFunction
) : Promise<void> => {
    const {userFirstName} = req.body;

    if (!userFirstName) {
      res.status(401).json({ message: "userFirstName manquant" });
      return;
    }

    const parsedRole = StringNameSchema.safeParse(userFirstName);
    if (!parsedRole.success) {
      res.status(400).json({ message: "userFirstName invalide." });
      return;
    }

    const formattedName = convertNomPropre(userFirstName);
    req.body.userFirstName = formattedName;


    next(); // continuer si tout est OK
  };
export default checkPostUserFirstName


