import ClasseurVierge from "@components/user/core/ClasseurVierge";
import jbdbLogo from "@pictures/exercice/chronometre.webp";

import {
  type PrincipalTagType,
  type SecondaryTagType,
} from "@shared/schema/tags.schema";
import { useMemo, useState } from "react";
import MaJbdbHome from "./MaJbdbHome";
import { useTranslation } from "react-i18next";

export default function MaJbdbHomeContainer() {
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
  const myComponentContent = (
    <>
      <div className="w-full border-b border-calculmental flex  items-center font-bold text-[1.6em]">
        <img className="w-[50px] ml-5 mr-2" src={jbdbLogo} />
        <p className="text-calculmental-dark text-[1.4em]">
          {t("jbdb.home.title")}
        </p>
      </div>
      <MaJbdbHome category="add" />
    </>
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
