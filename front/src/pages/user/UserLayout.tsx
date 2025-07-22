import { Navigate, Outlet } from "react-router-dom";
import Loader from "@components/core/Loader";
import HeaderTeacher from "@components/user/teacher/core/HeaderTeacher";
import MenuTeacher from "@components/user/teacher/core/MenuTeacher";
import { useAuthStrict } from "@hook/useAuthStrict";
import { redirectionNoUser } from "@utils/createRedirection";
import { useMemo } from "react";
import HeaderAdmin from "@components/user/admin/core/HeaderAdmin";
import MenuAdmin from "@components/user/admin/core/MenuAdmin";

export default function UserLayout() {
  const auth = useAuthStrict();
  const isAuthenticated = auth.status === "authenticated";
  const user = isAuthenticated ? auth.user : undefined;
  const setUser = isAuthenticated ? auth.setUser : undefined;
  // useMemo est toujours appelé (même si user est undefined temporairement)
  const stableUser = useMemo(() => user, [user]);
  if (auth.status === "loading") return <Loader />;
  if (auth.status === "unauthenticated") {
    const redirection = redirectionNoUser();
    return <Navigate to={redirection} replace />;
  }
  if (user === undefined || setUser === undefined) {
    const redirection = redirectionNoUser();
    return <Navigate to={redirection} replace />;
  }

  const roleUser = user.roleActivated.roleName;
  let headerComponent = null;
  let menuComponent = null;
  switch (roleUser) {
    case "TEACHER":
      headerComponent = <HeaderTeacher user={stableUser!} />;
      menuComponent = <MenuTeacher user={stableUser!} changeRole={setUser} />;
      break;
    case "ADMIN_SCHOOL":
      headerComponent = <HeaderAdmin user={stableUser!} />;
      menuComponent = <MenuAdmin user={stableUser!} changeRole={setUser} />; // Assuming you have a different menu for admin
      break;
  }
  return (
    <div
      className="flex flex-col h-[100vh]"
      // style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      {headerComponent}
      <div className="flex flex-1 relative">
        {menuComponent}
        <main className="w-full mx-2">
          <Outlet context={stableUser!} /> {/* Rendu des routes enfants */}
        </main>
      </div>
      <footer>...</footer>
    </div>
  );
}
