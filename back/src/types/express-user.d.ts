// types/express/index.d.ts
import { UserSessionConnectType } from "@shared/schema/user.schema";
import "express";

declare module "express" {
  interface Request {
    user?: UserSessionConnectType;
  }
}
