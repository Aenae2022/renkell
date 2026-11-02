import { useAuthStrict } from "@hook/useAuthStrict";
import { Navigate, Outlet } from "react-router-dom";

export default function TeacherRoutes() {
  const auth = useAuthStrict();
  if (auth.status === "loading") return null;

  if (auth.status !== "authenticated") {
    const refSchool = localStorage.getItem("school");
    if (!refSchool) {
      return <Navigate to="/" replace />;
    }
    const direction = "/degemer/" + refSchool + "/teacher";
    return <Navigate to={direction} replace />;
  }

  if (auth.user.roleActivated.roleName !== "TEACHER") {
    return <Navigate to="/user" replace />;
  }
  const user = auth.user;
  return <Outlet context={user} />;
}
