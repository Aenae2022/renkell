import { NextFunction, Request, Response } from "express";
import z from "zod";
import GroupModel from "@srcBack/model/GroupModel";
import UserModel from "@srcBack/model/UserModel";

export const checkLinkAssociationPostValid = async(
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<void>=>{

  const { refId, linkId, type, operation } = req.body;
  if (!refId || !linkId || !type || !operation) {
    res.status(400).json({ message: "Les paramètres refId, linkId, type et operation sont requis." });
    return;
  }

  // ✅ Validation des données envoyées avec Zod
  const zRefId = z.number().safeParse(refId);
  const zLinkId = z.number().safeParse(linkId);
  const zType = z.enum(["group", "user"]).safeParse(type);
  const zOperation = z.enum(["addAssociation", "removeAssociation"]).safeParse(operation);

  if (!zRefId.success || !zLinkId.success || !zType.success || !zOperation.success) {
    res.status(400).json({
      message: "Validation des paramètres échouée",
      errors: {
            refId: zRefId.error ? z.flattenError(zRefId.error).fieldErrors : undefined,
            linkId: zLinkId.error?z.flattenError(zLinkId.error).fieldErrors : undefined,
            type: zType.error?z.flattenError(zType.error).fieldErrors : undefined,
            operation: zOperation.error?z.flattenError(zOperation.error).fieldErrors : undefined,
        },
    });
    return;
 }

  // 🧼 On travaille maintenant avec les données validées
  const vRefId = zRefId.data;
  const vLinkId = zLinkId.data;
  const vType = zType.data;
  const vOperation = zOperation.data;

  req.body.refId = vRefId;
  req.body.linkId = vLinkId;
  req.body.type = vType;
  req.body.operation = vOperation;

  //vérification des données en base de données
  if (vType === "group") {
    const groupIdExists = await GroupModel.doesGroupIdExist(vRefId);
    if (!groupIdExists) {
      res.status(404).json({ message: "salle de classe introuvable" });
      return
    }
  }
  if (vType === "user") {
    const userIdExists = await UserModel.doesUserIdExist(vRefId);
    if (!userIdExists) {
      res.status(404).json({ message: "utilisateur introuvable" });
      return
    }
  }

  next();
}