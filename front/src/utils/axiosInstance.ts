// src/utils/axiosInstance.ts
import axios from "axios";
import { refreshToken } from "./auth";
import  {jwtDecode}  from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3173", // à adapter selon ton backend
});
interface JwtPayload {
  exp?: number;
  [key: string]: unknown; // pour autoriser d'autres propriétés dans le token
}
// Intercepteur pour ajouter le token
axiosInstance.interceptors.request.use( async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000; // en secondes

    //si le token exprire dans moins de 2 minutes, on le refresh
    if(decoded.exp && decoded.exp - currentTime < 120) {
      const newToken = await refreshToken(token);
      if(newToken) {
        localStorage.setItem("token", newToken); // Met à jour le token dans le localStorage
        config.headers.Authorization = `Bearer ${newToken}`; // 🔐 ajoute le nouveau token à chaque requêt
      }
    }else {
        config.headers.Authorization = `Bearer ${token}`; // 🔐 ajoute le token à chaque requête
      }
    }
  return config;
});

// Intercepteur de réponse : redirige si token invalide ou expiré
axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        // Efface le token
        localStorage.removeItem("token");
  
        // Redirige vers la page de login
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

export default axiosInstance;
