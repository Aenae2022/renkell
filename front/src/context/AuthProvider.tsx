// front/src/context/AuthProvider.tsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";
import { type UserSessionConnectType } from "@shared/schema/user.schema";
import type { PasswordType } from "@shared/schema/fields/password.schema";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSessionConnectType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/auth/session")
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        }
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (
    pseudo: string | null,
    password: PasswordType | null
  ) => {
    try {
      const response = await api.post("/api/auth/login", {
        userPseudo: pseudo,
        userPsswd: password,
      });
      if (response.data.reponse === true) {
        // Re-check de la session juste après le login
        const sessionRes = await api.get("/api/auth/session");
        if (sessionRes.data.success) {
          setUser(sessionRes.data.user);
          return { reponse: true, result: sessionRes.data.user };
        }
      }

      return { reponse: false, result: undefined };
    } catch (err) {
      console.error("Erreur login :", err);
      return { reponse: false, result: undefined };
    }
  };
  return (
    <AuthContext.Provider value={{ user, setUser, loading, login }}>
      {children}
    </AuthContext.Provider>
  );
}
