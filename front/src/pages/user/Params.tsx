import { useAuthStrict } from "../../hook/useAuthStrict";
import ClasseurVierge from "../../components/user/core/ClasseurVierge";
import {
  type PrincipalTagType,
  type SecondaryTagType,
} from "@shared/schema/tags.schema";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import logoLiens from "@pictures/icons/liens.png";

export default function DegemerParamsLinks() {
  const auth = useAuthStrict();
  if (!auth) return null; // ou loader / fallback
  return <ShowPage />;
}

function ShowPage() {
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

  const { t } = useTranslation();
  const navigate = useNavigate();
  const myComponentContent = (
    <div>
      <h1 className="text-2xl font-bold text-grammaire text-center">
        {t("degemerParams.titlePage")}
      </h1>
      <div
        className={`flex flex-col justify-end items-center 
      w-32 h-32 m-5 bg-amber-100 cursor-pointer pt-2 px-2
      align-text-bottom text-m text-black
      border-r-4 border-b-4 border-gray-700 rounded-[10px] 
      `}
      >
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <img
            className="w-full h-full object-contain rounded-xl"
            alt="logoLiens"
            src={logoLiens}
            onClick={() => {
              navigate("/dashboard/params/links");
            }}
          />
        </div>
        <p className="text-center px-1 text-sm whitespace-pre-wrap">
          {t("degemerParams.links")}
        </p>
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
