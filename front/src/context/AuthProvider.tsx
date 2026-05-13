// front/src/context/AuthProvider.tsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";
import { type UserSessionConnectType } from "@shared/schema/user.schema";
import type { PasswordType } from "@shared/schema/fields/password.schema";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSessionConnectType | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   api
  //     .get("/api/auth/session")
  //     .then((res) => {
  //       if (res.data.success) {
  //         setUser(res.data.user);
  //       } else {
  //         // L'API a répondu, mais pas de session valide
  //         setUser(null);
  //       }
  //     })
  //     .catch((err) => {
  //       if (err.response?.status === 401) {
  //         setUser(null); // ❗ seulement si non autorisé
  //       } else {
  //         console.warn("Erreur temporaire, on garde l'utilisateur connecté");
  //         // Ne rien faire ici => garder l'utilisateur tel quel
  //       }
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    //en test pour voir si déconnection en cas d'erreur serveur
    api
      .get("/api/auth/session")
      .then((res) => {
        setUser(res.data.user); // si ça passe → user existe
      })
      .catch((err) => {
        const status = err.response?.status;

        if (status === 401) {
          setUser(null);
        } else {
          console.warn("Erreur serveur, on garde la session");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (
    pseudo: string | null,
    password: PasswordType | null,
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

  const reloadSessionUser = async () => {
    setLoading(true);
    try {
      const session = await api.get("/api/auth/session");
      if (session.data.success) {
        setUser(session.data.user);
      }
      return session.data.user;
    } catch (e) {
      console.error("Erreur chargement session :", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, login, reloadSessionUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
