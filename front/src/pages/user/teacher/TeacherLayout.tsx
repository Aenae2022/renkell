import { Navigate, Outlet } from "react-router-dom";
import Loader from "@components/core/Loader";
import HeaderTeacher from "@components/user/teacher/core/HeaderTeacher";
import MenuTeacher from "@components/user/teacher/core/MenuTeacher";
import { useAuthStrict } from "@hook/useAuthStrict";
import { redirectionNoUser } from "@utils/createRedirection";

export default function TeacherLayout() {
  const auth = useAuthStrict();
  if (auth.status === "loading") return <Loader />;
  if (auth.status === "unauthenticated") {
    const redirection = redirectionNoUser();
    return <Navigate to={redirection} replace />;
  }
  const { user } = auth;

  return (
    <div
      className="flex flex-col h-[100vh]"
      // style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <HeaderTeacher user={user} />
      <div className="flex flex-1 relative">
        <MenuTeacher user={user} />
        <main className="w-full mx-2">
          <Outlet context={user} /> {/* Rendu des routes enfants */}
        </main>
      </div>
      <footer>...</footer>
    </div>
  );
}
