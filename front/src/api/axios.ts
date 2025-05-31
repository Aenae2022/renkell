//front/src/aopi/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // URL de ton backend
  withCredentials: true, // 🔴 C’est ça qui envoie les cookies !
});

export default api;
