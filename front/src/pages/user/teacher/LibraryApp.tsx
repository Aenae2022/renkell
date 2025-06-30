import ClasseurVierge from "@components/user/core/ClasseurVierge";
import Loader from "@components/core/Loader";
import {
  defineActiveTags,
  PrincipalTag,
  SecondaryTag,
} from "@utils/createClasseur";
import { useEffect, useMemo, useState } from "react";
import type { UserSessionConnectType } from "@shared/schema/user.schema";
import { useOutletContext } from "react-router-dom";
import type { GroupMiniType } from "@shared/schema/group.schema";
import { useTranslation } from "react-i18next";
import StudentsLibrary from "@components/user/teacher/library/StudentsLibrary";
import BooksLibrary from "@components/user/teacher/library/BooksLibrary";

export default function LibraryApp() {
  const user = useOutletContext<UserSessionConnectType>();

  const [principalTagActivated, setPrincipalTagActivated] =
    useState<string>("");
  const [secondaryTagActivated, setSecondaryTagActivated] =
    useState<string>("");

  //ici les données de fonctionnement du classeur
  //définir les onglets
  //1-les onglets principaux : students, books, stats, params
  const principalTagsList = useMemo(() => {
    const list = [
      new PrincipalTag(
        user.userId,
        "library.pTag.students",
        "students",
        "calculmental"
      ),
      new PrincipalTag(
        user.userId,
        "library.pTag.books",
        "books",
        "orthographe"
      ), //id, title, concerned, color
      new PrincipalTag(
        user.userId,
        "library.pTag.stats",
        "stats",
        "resolution"
      ), //id, title, concerned, color
      new PrincipalTag(user.userId, "library.pTag.params", "params", "mesure"), //id, title, concerned, color
    ];
    return list;
  }, [user.userId]);

  //les onglets secondaires
  const secondaryTagsList: SecondaryTag[] = useMemo(() => {
    const list: SecondaryTag[] = [];
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

  //ici les données propres à Library

  let myComponentContent = <Loader />;
  const { t } = useTranslation();
  //définir le group à afficher. Ici on prend le premier group de l'utilisateur
  //TODO : proposer changer de group pour la librairie
  const [groupToShow] = useState<GroupMiniType>({
    groupId: user.userGroups.length > 0 ? user.userGroups[0].groupId : 0,
    groupName:
      user.userGroups.length > 0 ? user.userGroups[0].groupName : "aucun",
  });
  if (user.userGroups.length === 0) {
    myComponentContent = (
      <p className="text-red-500">{t("library.degemer.error")}</p>
    );
  } else {
    switch (principalTagActivated) {
      case principalTagsList[0].ref: {
        //studentsLibrary
        myComponentContent = <StudentsLibrary group={groupToShow} />;
        break;
      }
      case principalTagsList[1].ref: {
        //BooksLibrary
        myComponentContent = <BooksLibrary group={groupToShow} />;
        break;
      }
      // case principalTagsList[2].ref: {
      //   //StatsLibrary
      //   myComponentContent = <StatsLibrary group={groupToShow} />;
      //   break;
      // }
      // case principalTagsList[3].ref: {
      //   //ParamsLibrary
      //   myComponentContent = <ParamsLibrary group={groupToShow} />;
      //   break;
      // }
      default:
        break;
    }

    return (
      <>
        <p className="text-xl font-bold ml-20">
          {groupToShow.groupName !== "aucun"
            ? `${t("library.degemer.title")}  ${groupToShow.groupName}`
            : ""}
        </p>
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
      </>
    );
  }
}
