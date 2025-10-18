import ClasseurVierge from "../../../components/user/core/ClasseurVierge";
import Loader from "../../../components/core/Loader";
// import LinksParams from "../../components/user/core/LinksParams";
import {
  defineActiveTags,
  PrincipalTag,
  SecondaryTag,
} from "../../../utils/createClasseur";
import { useEffect, useMemo, useState } from "react";
import type { UserSessionConnectType } from "@shared/schema/user.schema";
import { useOutletContext } from "react-router-dom";
import ParamsStudents from "@components/user/admin/paramsSchool/ParamsStudents";

export default function ParamsSchool() {
  const user = useOutletContext<UserSessionConnectType>();

  const [principalTagActivated, setPrincipalTagActivated] =
    useState<string>("");
  const [secondaryTagActivated, setSecondaryTagActivated] =
    useState<string>("");

  //ici les données de fonctionnement du classeur
  //définir les onglets
  //1-l'onglet user
  const principalTagsList = useMemo(() => {
    const list = [];

    //si l'utisateur a une école on gère les classroom
    if (user.userSchool !== null) {
      list.push(
        new PrincipalTag(
          user.userSchool.schoolId,
          "paramsSchool.pTag.classroom",
          "school",
          "calculmental"
        )
      ); //id, title, concerned, color
    }

    //on crée les onglets suivants
    list.push(
      new PrincipalTag(2, "paramsSchool.pTag.user", "user", "geometrie")
    );

    return list;
  }, [user]);

  //les onglets secondaires
  const secondaryTagsList: SecondaryTag[] = useMemo(() => {
    const secondaryTagsTypes = [
      {
        type: "student",
        title: "paramsSchool.sTag.student",
        color: "grammaire",
        ref: "user2",
      },
      {
        type: "teacher",
        title: "paramsSchool.sTag.teacher",
        color: "conjugaison",
        ref: "user2",
      },
      {
        type: "admin",
        title: "paramsSchool.sTag.admin",
        color: "lexique",
        ref: "user2",
      },
    ];
    const list: SecondaryTag[] = [];
    secondaryTagsTypes.forEach((type) => {
      list.push(new SecondaryTag(type.type, type.title, type.color, type.ref));
    });

    return list;
  }, []);

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
  // let myComponentContent = <LinksParamsSkeleton />;

  if (principalTagActivated === "user2") {
    switch (secondaryTagActivated) {
      case "student":
        myComponentContent = <ParamsStudents />;
        break;
      case "teacher":
        myComponentContent = <Loader />;
        break;
      default:
        myComponentContent = <Loader />;
        break;
    }
  }

  //cas des liens internet
  //   if (secondaryTagActivated === "link") {
  //     const monTypeSelected = principalTagsList.find(
  //       (tag) => tag.ref === principalTagActivated
  //     )?.concerned;
  //     const monIdSelected = principalTagsList.find(
  //       (tag) => tag.ref === principalTagActivated
  //     )?.id;
  //     if (monTypeSelected && monIdSelected) {
  //       myComponentContent = (
  //         <LinksParams typeRef={monTypeSelected} idRef={monIdSelected} />
  //       );
  //     }
  //   }

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
