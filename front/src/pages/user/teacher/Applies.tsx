import ClasseurVierge from "../../../components/user/core/ClasseurVierge";
import {
  type PrincipalTagType,
  type SecondaryTagType,
} from "@shared/schema/tags.schema";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import logoLibrary from "@pictures/icons/lecture.png";
import logoJbdb from "@pictures/exercice/chronometre.webp";
import logoNumber from "@pictures/icons/nombre-2.png";

export default function Applies() {
  const [principalTagActivated, setPrincipalTagActivated] =
    useState<string>("");
  const [secondaryTagActivated, setSecondaryTagActivated] =
    useState<string>("");

  //ici les données de fonctionnement du classeur
  //définir les onglets
  //1-l'onglet user
  const principalTagsList = useMemo(() => {
    const list: PrincipalTagType[] = [];
    return list;
  }, []);

  //les onglets secondaires
  const secondaryTagsList: SecondaryTagType[] = useMemo(() => {
    const list: SecondaryTagType[] = [];
    return list;
  }, []);

  //###############################################################################################
  //###############################################################################################
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [appliesList] = useState<
    { logo: string; routeLink: string; title: string }[]
  >([
    {
      logo: logoLibrary,
      routeLink: "/teacher/library",
      title: "userMenu.library",
    },
    {
      logo: logoJbdb,
      routeLink: "/teacher/jbdb",
      title: "jbdb.home.title",
    },
    {
      logo: logoNumber,
      routeLink: "/teacher/nbre/ecrireParams",
      title: "applies.ecrireNombre.globalTitle",
    },
  ]);
  const myComponentContent = (
    <div>
      <h1 className="text-2xl font-bold text-calcul text-center">
        {t("main.titlePageApplies")}
      </h1>
      <div className="flex">
        {appliesList.map((apply, index) => (
          <div
            key={index}
            className={`flex flex-col justify-end items-center 
          w-32 h-32 m-5 bg-amber-100 cursor-pointer pt-2 px-2
          align-text-bottom text-m text-black
          border-r-4 border-b-4 border-gray-700 rounded-[10px] 
          `}
            onClick={() => {
              navigate(apply.routeLink);
            }}
          >
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              <img
                className="w-full h-full object-contain rounded-xl"
                alt={apply.title}
                src={apply.logo}
              />
            </div>
            <p className="text-center px-1 text-sm whitespace-pre-wrap">
              {t(apply.title)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <ClasseurVierge
      principalTagsList={principalTagsList}
      secondaryTagsList={secondaryTagsList}
      activatedPrincipal={principalTagActivated}
      activatedSecondary={secondaryTagActivated}
      setPrincipalTagActivated={setPrincipalTagActivated}
      setSecondaryTagActivated={setSecondaryTagActivated}
    >
      {myComponentContent}
    </ClasseurVierge>
  );
}
