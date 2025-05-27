import { createContext } from "react";
import { type UserDatasConnectType } from "@shared/schema/user.schema";
import type { GroupInfoType } from "@shared/schema/group.schema";

export interface AuthContextType {
  tokenConn: string | null;
  userConn: UserDatasConnectType | null; //
  groupPConn: GroupInfoType | null; //
  login: (
    tokenConn: string,
    userConn: UserDatasConnectType,
    groupPConn: GroupInfoType
  ) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
