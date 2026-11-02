import Loader from "@components/core/Loader";

import { useLocation } from "react-router-dom";
import RaccourcisLink from "@components/user/teacher/dashboard/RaccourcisLink";
import Classeur from "@components/core/classeur/Classeur";
import type { PrincipalTag, SecondaryTag } from "@components/core/classeur/types";

const principalTags: PrincipalTag[] = [
      {
        id: "link",
        label: "userParamsLinks.sTag.link",
        color: "geometrie"
      }, 
      {
        id: "app",
        label: "userParamsLinks.sTag.appli",
        color: "resolution"
      }
    ];

  //les onglets secondaires
  const secondaryTags: SecondaryTag[] = []

export default function DegemerParamsLinks() {
    
  const location = useLocation();
  const restoreSession = location.state?.restoreClasseur === true;


  return (
        <Classeur principalTags={principalTags} secondaryTags={secondaryTags} restoreSession={restoreSession}>
            {(principal) => {
                if (principal === "link") {
                    return (
                        <RaccourcisLink />
                    )
                }

                return (
                    <Loader />
                );
            }}
        </Classeur>
    );
}
