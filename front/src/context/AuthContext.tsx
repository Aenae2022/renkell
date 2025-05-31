// front/src/context/AuthContext.tsx
import type { UserSessionConnectType } from "@shared/schema/user.schema";
import { createContext, useContext } from "react";

type AuthContextType = {
  user: UserSessionConnectType | null;
  setUser: React.Dispatch<React.SetStateAction<UserSessionConnectType | null>>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
