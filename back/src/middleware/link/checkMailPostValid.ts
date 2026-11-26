// middleware/validateAndSanitizeEmail.ts
import { Request, Response, NextFunction } from 'express';
import { MailSchema } from '@shared/schema/mail.schema';
import xss from 'xss';
import UserModel from '@srcBack/model/UserModel';

export const checkMailPostValid =async (
  req: Request,
  res: Response,
  next: NextFunction
) =>  {

  const parseResult = MailSchema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({
      message: 'Invalid email data',
      issues: parseResult.error.format(),
    });
    return;
  }
  //vérification du userId
  const userValid = await UserModel.doesUserIdExist(req.body.sender);
  if(!userValid){
    res.status(400).json({ message: "Utilisateur introuvable." });
    return;
  }

  const sanitized = {
    ...parseResult.data,
    subject: xss(parseResult.data.subject),
    message: xss(parseResult.data.message),
  };

  req.body = sanitized;
  next();
};
