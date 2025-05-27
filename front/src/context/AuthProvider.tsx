import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { type UserDatasConnectType } from "@shared/schema/user.schema";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";
import type { GroupInfoType } from "@shared/schema/group.schema";

interface JwtPayload {
  exp: number; // Date d'expiration UNIX (en secondes)
  id: string;
}

function isTokenValid(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000; // en secondes
    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Erreur lors de la décodage du token :", error);
    return false; // Token invalide ou mal formé
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [tokenConn, setTokenConn] = useState<string | null>(
    localStorage.getItem("tokenConn")
  );
  const [userConn, setUserConn] = useState<UserDatasConnectType | null>(
    localStorage.getItem("userConn")
      ? JSON.parse(localStorage.getItem("userConn")!)
      : null
  );
  const [groupPConn, setGroupPConn] = useState<GroupInfoType | null>(
    localStorage.getItem("groupConn")
      ? JSON.parse(localStorage.getItem("groupConn")!)
      : null
  );

  const navigate = useNavigate();

  const login = (
    newToken: string,
    userData: UserDatasConnectType,
    newGroupP: GroupInfoType
  ) => {
    setTokenConn(newToken);
    setUserConn(userData);
    setGroupPConn(newGroupP);
  };

  const logout = useCallback(() => {
    setTokenConn(null);
    setUserConn(null);
    setGroupPConn(null);
    navigate("/"); // Rediriger vers la page d'accueil'
  }, [navigate]);

  useEffect(() => {
    if (tokenConn) {
      if (!isTokenValid(tokenConn)) {
        logout(); // Token expiré ou invalide
      } else {
        localStorage.setItem("tokenConn", tokenConn);
      }
    } else {
      localStorage.removeItem("tokenConn");
    }

    if (userConn) {
      localStorage.setItem("userConn", JSON.stringify(userConn));
    } else {
      localStorage.removeItem("userConn");
    }
    if (groupPConn) {
      localStorage.setItem("groupPConn", JSON.stringify(groupPConn));
    } else {
      localStorage.removeItem("groupPConn");
    }
  }, [tokenConn, userConn, groupPConn, logout]);

  return (
    <AuthContext.Provider
      value={{ tokenConn, userConn, groupPConn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
