import { Navigate, Outlet } from "react-router-dom";
import Loader from "@components/core/Loader";
import HeaderTeacher from "@components/user/teacher/core/HeaderTeacher";
import MenuTeacher from "@components/user/teacher/core/MenuTeacher";
import { useAuthStrict } from "@hook/useAuthStrict";
import { redirectionNoUser } from "@utils/createRedirection";
import { useMemo } from "react";

export default function TeacherLayout() {
  const auth = useAuthStrict();
  const isAuthenticated = auth.status === "authenticated";
  const user = isAuthenticated ? auth.user : undefined;

  // useMemo est toujours appelé (même si user est undefined temporairement)
  const stableUser = useMemo(() => user, [user]);
  if (auth.status === "loading") return <Loader />;
  if (auth.status === "unauthenticated") {
    const redirection = redirectionNoUser();
    return <Navigate to={redirection} replace />;
  }
  if (user === undefined) {
    const redirection = redirectionNoUser();
    return <Navigate to={redirection} replace />;
  }

  return (
    <div
      className="flex flex-col h-[100vh]"
      // style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <HeaderTeacher user={stableUser!} />
      <div className="flex flex-1 relative">
        <MenuTeacher user={stableUser!} />
        <main className="w-full mx-2">
          <Outlet context={stableUser!} /> {/* Rendu des routes enfants */}
        </main>
      </div>
      <footer>...</footer>
    </div>
  );
}
