import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Loader from "@components/core/Loader";
import HeaderTeacher from "@components/user/teacher/core/HeaderTeacher";
import MenuTeacher from "@components/user/teacher/core/MenuTeacher";
import { useAuthStrict } from "@hook/useAuthStrict";
import { redirectionNoUser } from "@utils/createRedirection";
import { useEffect, useState } from "react";

export default function TeacherLayout() {
  const auth = useAuthStrict();
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      auth.status === "authenticated" &&
      auth.user.roleActivated.roleName === "TEACHER"
    ) {
      setReady(true);
    } else if (auth.status === "authenticated") {
      setReady(false);
      let redirectionName = "";
      switch (auth.user.roleActivated.roleName) {
        case "ADMIN_SCHOOL":
          redirectionName = "/admin";
          break;
        case "STUDENT":
          redirectionName = "/student";
          break;
        case "SUPER_ADMIN":
          redirectionName = "/master";
          break;
        default:
          redirectionName = redirectionNoUser();
      }
      const redirection = redirectionName;
      navigate(redirection);
    } else if (auth.status === "unauthenticated") {
      setReady(false);
      navigate(redirectionNoUser());
    }
  }, [auth, navigate]);

  if (auth.status === "loading" || !ready) return <Loader />;
  if (auth.status === "unauthenticated") return <Navigate to="/" replace />;
  if (auth.user.roleActivated.roleName !== "TEACHER")
    return <Navigate to="/user" replace />;
  return (
    <div className="flex flex-col h-[100vh]">
      <HeaderTeacher user={auth.user} />
      <div className="flex flex-1 relative">
        <MenuTeacher user={auth.user} changeRole={auth.setUser} />
        <main className="w-full mx-2">
          <Outlet context={auth.user} /> {/* Rendu des routes enfants */}
        </main>
      </div>
      <footer>...</footer>
    </div>
  );
}
