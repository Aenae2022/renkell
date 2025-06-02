import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Loader from "../../components/core/Loader";
import { useAuth } from "../../context/AuthContext";
export default function UserLayout() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const resCheck = await api.get("/api/auth/session");
      if (resCheck.data.user) {
        setLoading(false);
      } else {
        const schoolRef = localStorage.getItem("school");
        const classroomRef = localStorage.getItem("classroom");
        const redirection =
          "/degemer/" +
          (schoolRef ? schoolRef : "0") +
          (classroomRef ? "/c/" + classroomRef : "");
        navigate(redirection);
      }
    };
    checkSession();
  }, [navigate]);
  const { user } = useAuth();
  console.log("user", user);
  if (loading) return <Loader />;

  return (
    <div
      className="app-container"
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <header>...</header>
      <div style={{ display: "flex", flex: 1 }}>
        <nav>...</nav>
        <main style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>
          <Outlet /> {/* Rendu des routes enfants */}
        </main>
      </div>
      <footer>...</footer>
    </div>
  );
}
