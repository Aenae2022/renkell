import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../../components/core/Loader";
import HeaderUser from "../../components/user/core/HeaderUser";
import MenuUser from "../../components/user/core/MenuUser";
import { useAuth } from "../../context/AuthContext";
export default function UserLayout() {
  const navigate = useNavigate();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      const schoolRef = localStorage.getItem("school");
      const classroomRef = localStorage.getItem("classroom");
      const redirection =
        "/degemer/" +
        (schoolRef ? schoolRef : "0") +
        (classroomRef ? "/c/" + classroomRef : "");
      navigate(redirection);
    }
  }, [loading, user, navigate]);
  console.log("user", user);
  if (loading) return <Loader />;

  return (
    <div
      className="flex flex-col h-[100vh]"
      // style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <HeaderUser />
      <div className="flex flex-1 relative">
        <MenuUser />
        <main className="w-full">
          <Outlet /> {/* Rendu des routes enfants */}
        </main>
      </div>
      <footer>...</footer>
    </div>
  );
}
