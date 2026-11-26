import HeaderAdmin from "@components/user/admin/core/HeaderAdmin";
import MenuAdmin from "@components/user/admin/core/MenuAdmin";
import type { UserSessionConnectType } from "@shared/schema/user.schema";
import { Outlet } from "react-router-dom";
type TeacherLayoutShellProps = {
  user: UserSessionConnectType;
  changeRole: (user: UserSessionConnectType) => void;
};
function AdminLayoutShell({ user, changeRole }: TeacherLayoutShellProps) {
  return (
    <div className="flex flex-col h-screen">
      <HeaderAdmin user={user} />

      <div className="flex flex-1">
        <MenuAdmin user={user} changeRole={changeRole} />
        <main className="flex-1">
          <Outlet context={user} />
        </main>
      </div>

      <footer>...</footer>
    </div>
  );
}

export default AdminLayoutShell;
