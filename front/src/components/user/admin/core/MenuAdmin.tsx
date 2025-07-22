import logoReglage from "@pictures/icons/reglage.webp";
import logoLibrary from "@pictures/icons/lecture.png";
import MenuUser from "../../core/MenuUser";
import type { UserSessionConnectType } from "@shared/schema/user.schema";

const icons = import.meta.glob<{ default: string }>("@pictures/iconsUser/*", {
  eager: true,
});

export function MenuAdmin({
  user,
  changeRole,
}: {
  user: UserSessionConnectType;
  changeRole: (user: UserSessionConnectType) => void;
}) {
  const iconUserSrc =
    icons[`/src/assets/pictures/iconsUser/${user.userIcon}`]?.default;

  const adminFunctions = [
    {
      action: "/teacher/params",
      icon: logoReglage,
      title: "reglages",
    },
    {
      action: "/teacher/library",
      icon: logoLibrary,
      title: "library",
    },
  ];

  return (
    <MenuUser
      iconUserSrc={iconUserSrc}
      myUserFunctions={adminFunctions}
      user={user}
      changeRole={changeRole}
    />
  );
}

export default MenuAdmin;
