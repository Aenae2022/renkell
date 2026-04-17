import Loader from "@components/core/Loader";
import { useAuthStrict } from "@hook/useAuthStrict";
import PublicLayoutShell from "./shells/PublicLayoutShell";
import TeacherLayoutShell from "./shells/TeacherLayoutShell";
import AdminLayoutShell from "./shells/AdminLayoutShell";

function SuperLayout() {
  const auth = useAuthStrict();

  if (auth.status === "loading") {
    return <Loader />;
  }

  if (auth.status !== "authenticated") {
    return <PublicLayoutShell />;
  }

  const user = auth.user;

  switch (user.roleActivated.roleName) {
    case "TEACHER":
      return <TeacherLayoutShell user={user} changeRole={auth.setUser} />;
    case "ADMIN_SCHOOL":
      return <AdminLayoutShell user={user} changeRole={auth.setUser} />;
    default:
      return <PublicLayoutShell />;
  }
}

export default SuperLayout;
