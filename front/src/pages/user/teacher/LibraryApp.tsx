
import { useState } from "react";
import type { UserSessionConnectType } from "@shared/schema/user.schema";
import { useLocation, useOutletContext } from "react-router-dom";
import type { GroupMiniType } from "@shared/schema/group.schema";
import { useTranslation } from "react-i18next";
import StudentsLibrary from "@components/user/teacher/library/StudentsLibrary";
import BooksLibrary from "@components/user/teacher/library/BooksLibrary";
import StatsLibrary from "@components/user/teacher/library/StatsLibrary";
import ParamsLibrary from "@components/user/teacher/library/ParamsLibrary";
import type { PrincipalTag, SecondaryTag } from "@components/core/classeur/types";
import Classeur from "@components/core/classeur/Classeur";

const principalTags: PrincipalTag[] = [
  {
    id: "students",
    label: "library.pTag.students",
    color: "calculmental"
  },
  {
    id: "books",
    label: "library.pTag.books",
    color: "orthographe"
  },
  {
    id: "stats",
    label: "library.pTag.stats",
    color: "resolution"
  },
  {
    id: "params",
    label: "library.pTag.params",
    color: "mesure"
  }
];

const secondaryTags: SecondaryTag[] = [];

export default function LibraryApp() {
  const user = useOutletContext<UserSessionConnectType>();
  const location = useLocation();
  const restoreSession = location.state?.restoreClasseur === true;

  const { t } = useTranslation();
  //définir le group à afficher. Ici on prend le premier group de l'utilisateur
  //TODO : proposer changer de group pour la librairie
  const [groupToShow] = useState<GroupMiniType>({
    groupId: user.userGroups.length > 0 ? user.userGroups[0].groupId : 0,
    groupName:
      user.userGroups.length > 0 ? user.userGroups[0].groupName : "aucun",
  });
  if (user.userGroups.length === 0) {
    return (
      <p className="text-red-500">{t("library.degemer.error")}</p>
    );
  } else {


    return (
      <>
        <p className="text-xl font-bold ml-20">
          {groupToShow.groupName !== "aucun"
            ? `${t("library.degemer.title")}  ${groupToShow.groupName}`
            : ""}
        </p>
        <Classeur principalTags={principalTags} secondaryTags={secondaryTags} restoreSession={restoreSession}>
          {(principal) => {
            switch (principal) {
              case "students": {
                //studentsLibrary
                return <StudentsLibrary group={groupToShow} />;
                break;
              }
              case "books": {
                //BooksLibrary
                return <BooksLibrary group={groupToShow} />;
                break;
              }
              case "stats": {
                //StatsLibrary
                return <StatsLibrary group={groupToShow} />;
                break;
              }
              case "params": {
                //ParamsLibrary
                return <ParamsLibrary group={groupToShow} />;
                break;
              }
              default:
                break;
            }
          }}
        </Classeur>
      </>
    );
  }
}
