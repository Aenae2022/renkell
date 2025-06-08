import logoReglage from "@pictures/icons/reglage.webp";
import logoLibrary from "@pictures/icons/lecture.png";
import MenuUser from "../../core/MenuUser";
import type { UserSessionConnectType } from "@shared/schema/user.schema";

const icons = import.meta.glob<{ default: string }>("@pictures/iconsUser/*", {
  eager: true,
});

export function MenuTeacher({ user }: { user: UserSessionConnectType }) {
  const iconUserSrc =
    icons[`/src/assets/pictures/iconsUser/${user.userIcon}`]?.default;

  const teacherFunctions = [
    {
      action: "/teacher/params",
      icon: logoReglage,
      title: "reglages",
    },
    {
      action: "teacher/library",
      icon: logoLibrary,
      title: "library",
    },
  ];

  return (
    <MenuUser iconUserSrc={iconUserSrc} myUserFunctions={teacherFunctions} />
  );
}

export default MenuTeacher;
