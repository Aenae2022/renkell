import { Request, Response, NextFunction } from "express";

export function checkRoles(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user;
    
    if (!user || !allowedRoles.includes(user.roleActivated.roleName)) {
      console.error("Accès interdit : rôle non autorisé")
      res.status(403).json({ message: "Accès interdit." });
      return;
    }

    next(); // continuer si tout est OK
  };
}
