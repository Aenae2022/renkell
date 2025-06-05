// front/src/context/AuthContext.tsx
import type { UserSessionConnectType } from "@shared/schema/user.schema";
import { createContext, useContext } from "react";

export type AuthContextType = {
  user: UserSessionConnectType | null;
  setUser: (user: UserSessionConnectType | null) => void;
  loading: boolean;
  login: (
    pseudo: string,
    password: string
  ) => Promise<{
    reponse: boolean;
    result: UserSessionConnectType | undefined;
  }>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  login: async () => {
    return { reponse: false, result: undefined };
  },
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
