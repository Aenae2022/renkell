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
import RaccourcisLink from "@components/user/teacher/dashboard/RaccourcisLink";

export default function DegemerParamsLinks() {
  const user = useOutletContext<UserSessionConnectType>();

  const [principalTagActivated, setPrincipalTagActivated] =
    useState<string>("");
  const [secondaryTagActivated, setSecondaryTagActivated] =
    useState<string>("");

  //ici les données de fonctionnement du classeur
  //définir les onglets principaux
  const principalTagsList = useMemo(() => {
    const list = [
      new PrincipalTag(
        user.userId,
        "userParamsLinks.sTag.link",
        "link",
        "geometrie"
      ),
      new PrincipalTag(
        user.userId,
        "userParamsLinks.sTag.appli",
        "appli",
        "resolution"
      ), //id, title, concerned, color
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

  const [message, setMessage] = useState<string>("");
  const [action, setAction] = useState<string>("link");
  let myComponentContent = <Loader />;
  useEffect(() => {
    const match = principalTagActivated.match(/^([a-zA-Z]+)([0-9]+)$/);

    if (match) {
      const action = match[1];
      setMessage("");
      setAction(action);
    } else {
      setMessage("dashboard.error");
      setAction("link");
    }
  }, [principalTagActivated]);

  // if (action == "appli") {
  //   myComponentContent = <p>Les raccourcis applis</p>;
  // }
  if (action == "link") {
    myComponentContent = <RaccourcisLink />;
  }

  return (
    <ClasseurVierge
      principalTagsList={principalTagsList}
      secondaryTagsList={secondaryTagsList}
      activatedPrincipal={principalTagActivated}
      activatedSecondary={secondaryTagActivated}
      setPrincipalTagActivated={setPrincipalTagActivated}
      setSecondaryTagActivated={setSecondaryTagActivated}
    >
      {message !== "" ? <p>{message}</p> : myComponentContent}
    </ClasseurVierge>
  );
}
