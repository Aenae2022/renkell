import { createContext } from "react";
import { type UserDatasConnectType } from "@shared/schema/user.schema";
import { type ClassroomShortType } from "@shared/schema/classroom.schema";

export interface AuthContextType {
  tokenConn: string | null;
  userConn: UserDatasConnectType | null; //
  classroomConn: ClassroomShortType | null; //
  login: (
    tokenConn: string,
    userConn: UserDatasConnectType,
    classroomConn: ClassroomShortType
  ) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
