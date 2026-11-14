import logoReglage from "@pictures/icons/reglage.webp";
import MenuUser from "../../core/MenuUser";
import logoApply from "@pictures/icons/apply.png";
import type { UserSessionConnectType } from "@shared/schema/user.schema";

const icons = import.meta.glob<{ default: string }>("@pictures/iconsUser/*", {
  eager: true,
});

export function MenuTeacher({
  user,
  changeRole,
}: {
  user: UserSessionConnectType;
  changeRole: (user: UserSessionConnectType) => void;
}) {
  const iconUserSrc =
    icons[`/src/assets/pictures/iconsUser/${user.userIcon}`]?.default;

  const teacherFunctions = [
    {
      action: "/teacher/params",
      icon: logoReglage,
      title: "reglages",
    },
    // {
    //   action: "/teacher/library",
    //   icon: logoLibrary,
    //   title: "library",
    // },
    {
      action: "/teacher/applies",
      icon: logoApply,
      title: "applies",
    },
  ];

  return (
    <MenuUser
      iconUserSrc={iconUserSrc}
      myUserFunctions={teacherFunctions}
      user={user}
      changeRole={changeRole}
    />
  );
}

export default MenuTeacher;
