import { Request, Response, NextFunction } from "express";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.user) {
    req.user = req.session.user; // 🔥 Stockage pour les autres middlewares
    next();
  } else {
    res.status(401).json({ message: "Non autorisé, merci de vous connecter." });
  }
}
