// front/src/context/AuthProvider.tsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";
import { type UserSessionConnectType } from "@shared/schema/user.schema";

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

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
