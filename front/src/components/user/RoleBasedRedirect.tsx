import { Navigate } from "react-router-dom";
import Loader from "@components/core/Loader";
import { useAuthStrict } from "@hook/useAuthStrict";

export default function RoleBasedRedirect() {
  const auth = useAuthStrict();

  if (auth.status === "loading") return <Loader />;

  if (auth.status === "unauthenticated")
    return <Navigate to="/login" replace />;
  console.log("roleActived", auth.user.roleActivated);
  switch (auth.user.roleActivated.roleName) {
    case "ADMIN_SCHOOL":
      return <Navigate to="/admin" replace />;
    case "TEACHER":
      return <Navigate to="/teacher" replace />;
    case "SUPER_ADMIN":
      return <Navigate to="/master" replace />;
    case "STUDENT":
      return <Navigate to="/student" replace />;
    default:
      // Rôle non reconnu, on déconnecte ou on redirige vers login
      return <Navigate to="/login" replace />;
  }
}
