import { useAuthStrict } from "../../../hook/useAuthStrict";
import logoReglage from "../../../assets/pictures/icons/reglage.webp";
import logoLibrary from "../../../assets/pictures/icons/lecture.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
// const icons = import.meta.glob("@pictures/iconsUser/*", { eager: true });
// const icons = import.meta.glob<{ default: string }>('@pictures/iconsUser/*', { eager: true });
const icons = import.meta.glob<{ default: string }>(
  "/src/assets/pictures/iconsUser/*",
  { eager: true }
);

export function MenuUser() {
  //TODO remove les const sessionStorage.getItem('principalTag') et sessionStorage.getItem('secondaryTag') pour démarrer sur un classeur propre
  const auth = useAuthStrict();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showTitle, setShowTitle] = useState(false);

  if (!auth) return null; // ou loader / fallback
  const { user } = auth;
  // const iconUserSrc = icons[`@pictures/iconsUser/${user.userIcon}`];
  const iconUserSrc =
    icons[`/src/assets/pictures/iconsUser/${user.userIcon}`]?.default;
  //   const iconUserSrc = "@pictures/iconsUser/" + user.userIcon;

  const usersFunction = [
    {
      action: "params",
      icon: logoReglage,
      title: "reglages",
      type: "teacher",
    },
    {
      action: "library",
      icon: logoLibrary,
      title: "library",
      type: "teacher",
    },
  ];
  const myUserFunction = usersFunction.filter(
    (item) => item.type === user.userType
  );
  // const iconUserSrc = "src/assets/pictures/iconsUser/"+user.srcIconUser
  return (
    <nav className="min-w-18 bg-geometrie  py-2 rounded-2xl border-2 border-gray-400 absolute top-0 left-2 z-index=9995">
      <div className="max-w-12 max-h-10 ml-2  mb-2 cursor-pointer">
        <img
          src={iconUserSrc}
          alt="iconUser"
          className="rounded-2xl max-w-10"
          onClick={() => (showTitle ? setShowTitle(false) : setShowTitle(true))}
        />
      </div>
      <div id="applicationsMenu">
        {myUserFunction.map((item) => {
          return (
            <div className="flex" key={item.title}>
              <div className="w-9 inline-block ml-4">
                <img
                  src={item.icon}
                  className="max-w-9 max-h-8 min-h-6 rounded-2xl cursor-pointer mb-2"
                  onClick={() => {
                    localStorage.setItem("principalTag", "");
                    localStorage.setItem("secondaryTag", "");
                    navigate("/dashboard/" + item.action);
                  }}
                />
              </div>
              <p className="inline-block ml-1">
                {showTitle ? t("userMenu." + item.title) : ""}
              </p>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

export default MenuUser;
