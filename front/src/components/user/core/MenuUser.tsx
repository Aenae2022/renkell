import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface MenuUserProps {
  iconUserSrc: string;
  myUserFunctions: {
    action: string;
    icon: string;
    title: string;
  }[];
}

export function MenuUser({ iconUserSrc, myUserFunctions }: MenuUserProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showTitle, setShowTitle] = useState(false);

  return (
    <nav className="min-w-18 bg-geometrie  py-2 rounded-2xl border-2 border-gray-400 absolute top-0 left-2 z-index=9995">
      <div className="max-w-12 max-h-10 ml-2  mb-2 cursor-pointer">
        <img
          src={iconUserSrc}
          alt="iconUser"
          className="rounded-2xl max-w-10 max-h-10"
          onClick={() => (showTitle ? setShowTitle(false) : setShowTitle(true))}
        />
      </div>
      <div id="applicationsMenu">
        {myUserFunctions.map((item) => {
          return (
            <div className="flex" key={item.title}>
              <div className="w-9 inline-block ml-4">
                <img
                  src={item.icon}
                  className="max-w-9 max-h-8 min-h-6 rounded-2xl cursor-pointer mb-2"
                  onClick={() => {
                    localStorage.setItem("principalTag", "");
                    localStorage.setItem("secondaryTag", "");
                    navigate(item.action);
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
