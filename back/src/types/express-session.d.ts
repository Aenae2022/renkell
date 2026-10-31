// types/express-session.d.ts
import "express-session";
import { UserSessionConnectType } from "@shared/schema/user.schema";

declare module "express-session" {
  interface SessionData {
    user?: UserSessionConnectType;
  }
}
