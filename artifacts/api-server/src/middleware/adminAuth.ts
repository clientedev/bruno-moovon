import { type Request, type Response, type NextFunction } from "express";

declare module "express-session" {
  interface SessionData {
    isAdmin: boolean;
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session?.isAdmin) {
    next();
  } else {
    res.status(401).json({ error: "Não autorizado" });
  }
}
