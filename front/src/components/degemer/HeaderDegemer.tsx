import { type SchoolType } from "@shared/schema/school.schema";
import { type ClassroomWithLinksType } from "@shared/schema/classroom.schema";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

import logo from "@pictures/icons/classeur.png";
import logoFR from "@pictures/icons/francais.png";
import logoBR from "@pictures/icons/breton.png";
import type { UserWithLinksType } from "@shared/schema/user.schema";

const lngs = {
  br: { nativeName: "BR" },
  fr: { nativeName: "FR" },
};

function HeaderDegemer({
  school,
  classroom,
  user,
}: {
  school: SchoolType | null;
  classroom: ClassroomWithLinksType | null;
  user: UserWithLinksType | null;
}) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  // const {user, logout} = useAuth();
  console.log("school", school);
  console.log("classroom", classroom);
  const title =
    school && school.schoolId !== 0
      ? t("header.skol.title") + " " + school.schoolName
      : "";
  const subTitle = classroom
    ? t("header.skol.classroom") + " " + classroom.group.groupName
    : user
    ? `${user.userFirstName} ${user.userFamilyName}`
    : "";

  const buttonText = user
    ? t("header.buttonDisconnect")
    : t("header.buttonConnect");

  // const handleAuthAction = () => {
  //     if (user) {
  //         logout(); // Déconnexion si l'utilisateur est connecté
  //     } else {
  //         navigate("/login"); // Redirection vers connexion sinon
  //     }
  // };
  return (
    <div className="flex mb-3 pb-3 pl-4 justify-between items-center bg-conjugaison-25">
      <div className="mr-header-element">
        <div id="ReturnMenu">
          <img
            src={logo}
            className="w-25 h-20"
            onClick={() => {
              if (school && school.schoolId !== 0) {
                navigate("/degemer/" + school.schoolRef);
              }
            }}
          />
        </div>
      </div>

      <div className="min-w-1/4">
        <div className="mr-header-welcomeMessage">
          <h1 className="text-4xl">{title}</h1>
          <h2>{subTitle}</h2>
        </div>
      </div>

      <div className="flex flex-col items-center pr-2 ">
        <button
          className="text-center text-sm border-1 border-gray-400 bg-lime-400 rounded-xl px-2 py-1"
          // onClick={handleAuthAction}
        >
          {buttonText}
        </button>
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

export default HeaderDegemer;
