import HeaderTeacher from "@components/user/teacher/core/HeaderTeacher";
import MenuTeacher from "@components/user/teacher/core/MenuTeacher";
import type { UserSessionConnectType } from "@shared/schema/user.schema";
import { Outlet } from "react-router-dom";
type TeacherLayoutShellProps = {
  user: UserSessionConnectType;
  changeRole: (user: UserSessionConnectType) => void;
};
function TeacherLayoutShell({ user, changeRole }: TeacherLayoutShellProps) {
  return (
    <div className="flex flex-col h-screen">
      <HeaderTeacher user={user} />

      <div className="flex flex-1">
        <MenuTeacher user={user} changeRole={changeRole} />
        <main className="flex-1">
          <Outlet context={user} />
        </main>
      </div>

      <footer>...</footer>
    </div>
  );
}

export default TeacherLayoutShell;
