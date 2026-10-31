import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import logo from "@pictures/icons/classeur.png";
import logoFR from "@pictures/icons/francais.png";
import logoBR from "@pictures/icons/breton.png";

const lngs = {
  br: { nativeName: "BR" },
  fr: { nativeName: "FR" },
};

function HeaderPublic() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex mb-3 pb-3 pl-4 justify-between items-center bg-conjugaison/25">
      <div className="mr-header-element">
        <div id="ReturnMenu">
          <img
            src={logo}
            className="w-25 h-20"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
      </div>

      <div className="min-w-1/4">
        <div className="mr-header-welcomeMessage">
          <h1 className="text-4xl">{t("header.public.title")}</h1>
          <h2>{t("header.public.subTitle")}</h2>
        </div>
      </div>

      <div className="flex flex-col items-center pr-2 ">
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
    </div>
  );
}

export default HeaderPublic;
