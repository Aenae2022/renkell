import ClasseurVierge from "@components/user/core/ClasseurVierge";
import Logo from "@pictures/icons/nombre-2.png";

import {
  type PrincipalTagType,
  type SecondaryTagType,
} from "@shared/schema/tags.schema";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function NombreParamsContainer({ children, title }: Props) {
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
      <div className="w-full mb-4 border-b border-nombre flex  items-center font-bold text-[1.6em]">
        <img className="w-[50px] ml-5 mr-2" src={Logo} />
        <p className="text-nombre-dark text-[1.4em]">{t(title)}</p>
      </div>
      {children}
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
