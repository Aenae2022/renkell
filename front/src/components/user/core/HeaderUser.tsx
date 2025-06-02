import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import logo from "@pictures/icons/classeur.png";
import logoFR from "@pictures/icons/francais.png";
import logoBR from "@pictures/icons/breton.png";
import ConnexionButton from "../../core/ConnectionButton";
import { useState } from "react";
import Login from "../../core/Login";
import { useAuthStrict } from "../../../hook/useAuthStrict";

const lngs = {
  br: { nativeName: "BR" },
  fr: { nativeName: "FR" },
};

function HeaderUser() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const auth = useAuthStrict();
  if (!auth) return null; // ou loader / fallback
  const { user } = auth;

  const title = user?.userFirstName + " " + user?.userFamilyName;
  //définir le sous-titre (group principal // group secondaire // école)
  let subTitle = "";
  if (user.userGroups.length > 0) {
    subTitle = t("header.skol.classroom") + " " + user.userGroups[0].groupName;
  } else if (user.userSchool) {
    subTitle = t("header.skol.title") + " " + user.userSchool.schoolName;
  }

  return (
    <div className="flex mb-3 pb-3 pl-4 justify-between items-center bg-conjugaison-25 relative top-2 left-2">
      <div className="mr-header-element">
        <div id="ReturnMenu">
          <img
            src={logo}
            className="w-[100px] min-w-[80px] h-[80px] min-h-[64px]"
            alt="logo"
            onClick={() => {
              navigate("/dashboard");
            }}
          />
        </div>
      </div>

      <div className="min-w-1/4">
        <div className="mr-header-welcomeMessage">
          <h1 className="text-4xl pl-4">{title}</h1>
          <h2>{subTitle}</h2>
        </div>
      </div>

      <div className="flex flex-col items-center pr-2 ">
        <ConnexionButton showLogin={setShowLogin} />
        <div className="flex ">
          {Object.keys(lngs).map((lng) => {
            let isSelected = "";
            if (i18n.resolvedLanguage === lng)
              isSelected = " ring ring-2 ring-amber-200 rounded-xl";
            const styleLng = "w-7 h-7 m-1" + isSelected;
            const logoUsed = lng === "fr" ? logoFR : logoBR;
            return (
              <img
                key={lng}
                src={logoUsed}
                className={styleLng}
                onClick={() => i18n.changeLanguage(lng)}
              />
            );
          })}
        </div>
      </div>
      {showLogin ? <Login showLogin={setShowLogin} /> : null}
    </div>
  );
}

export default HeaderUser;
