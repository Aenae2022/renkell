import { useAuthStrict } from "../../../../hook/useAuthStrict";
import logoReglage from "@pictures/icons/reglage.webp";
import logoLibrary from "@pictures/icons/lecture.png";
import MenuUser from "../../core/MenuUser";

const icons = import.meta.glob<{ default: string }>("@pictures/iconsUser/*", {
  eager: true,
});

export function MenuTeacher() {
  const auth = useAuthStrict();

  if (!auth) return null; // ou loader / fallback
  const { user } = auth;
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
