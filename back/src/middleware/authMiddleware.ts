import { Request, Response, NextFunction } from "express";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "Non autorisé, merci de vous connecter." });
  }
}
