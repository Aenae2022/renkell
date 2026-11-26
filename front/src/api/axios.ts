//front/src/aopi/axios.ts
import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // 🔴 C’est ça qui envoie les cookies !
});

// Intercepteur de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      // Redirection vers la page d'accueil
      const schoolRef = localStorage.getItem("school");
      const classroomRef = localStorage.getItem("classroom");
      const redirection =
        "/degemer/" +
        (schoolRef ? schoolRef : "0") +
        (classroomRef ? "/c/" + classroomRef : "");
      window.location.href = redirection; 
    }

    return Promise.reject(error); // pour gérer les autres erreurs si besoin
  }
);

export default api;
