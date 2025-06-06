import ClasseurVierge from "../../core/ClasseurVierge";
import Loader from "../../../core/Loader";
// import LinksParams from "../../components/user/core/LinksParams";
import {
  defineActiveTags,
  PrincipalTag,
  SecondaryTag,
} from "../../../../utils/createClasseur";
import { useEffect, useMemo, useState } from "react";
import type { UserSessionConnectType } from "@shared/schema/user.schema";
import { useOutletContext } from "react-router-dom";

export default function DegemerParamsLinks() {
  const user = useOutletContext<UserSessionConnectType>();

  const [principalTagActivated, setPrincipalTagActivated] =
    useState<string>("");
  const [secondaryTagActivated, setSecondaryTagActivated] =
    useState<string>("");

  //ici les données de fonctionnement du classeur
  //définir les onglets
  //1-l'onglet user
  const principalTagsList = useMemo(() => {
    const list = [
      new PrincipalTag(
        user.userId,
        "userParamsLinks.pTag.teacher",
        "user",
        "calculmental"
      ), //id, title, concerned, color
    ];
    //2-récupérer les onglets pour les groupes gérés par l'enseignant
    if (user.userGroups.length > 0) {
      user.userGroups.forEach((group) => {
        const groupColor = group.principal ? "grammaire" : "conjugaison";
        list.push(
          new PrincipalTag(group.groupId, group.groupName, "group", groupColor)
        );
      });
    }
    return list;
  }, [user.userId, user.userGroups]);

  //les onglets secondaires
  const secondaryTagsList: SecondaryTag[] = useMemo(() => {
    const secondaryTagsTypes = [
      { type: "link", title: "userParamsLinks.sTag.link", color: "geometrie" },
      {
        type: "appli",
        title: "userParamsLinks.sTag.appli",
        color: "resolution",
      },
    ];
    const list: SecondaryTag[] = [];
    principalTagsList.forEach((tag) => {
      secondaryTagsTypes.forEach((type) => {
        list.push(
          new SecondaryTag(
            type.type,
            type.title,
            type.color,
            tag.concerned + tag.id
          )
        );
      });
    });
    return list;
  }, [principalTagsList]);

  //gestion des onglets actifs
  useEffect(() => {
    const { startPrincipalTag, startSecondaryTag } = defineActiveTags(
      principalTagsList,
      secondaryTagsList
    );
    setPrincipalTagActivated(startPrincipalTag);
    setSecondaryTagActivated(startSecondaryTag);
  }, [principalTagsList, secondaryTagsList]);

  let myComponentContent = <Loader />;

  //cas des liens internet
  // if (secondaryTagActivated === 'link' ){
  //     const monTypeSelected = principalTagsList.find(tag => tag.ref === principalTagActivated)?.concerned;
  //     const monIdSelected = principalTagsList.find(tag => tag.ref === principalTagActivated)?.id;
  //     myComponentContent = <LinksParams typeRef={monTypeSelected} idRef={monIdSelected}/>
  // }
  // const myComponent = <>{myComponentHeader} {myComponentContent}</>
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
