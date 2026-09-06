import ClasseurVierge from "@components/user/core/ClasseurVierge";
import Loader from "@components/core/Loader";
import {
  defineActiveTags,
  PrincipalTag,
  SecondaryTag,
} from "@utils/createClasseur";
import { useEffect, useMemo, useState } from "react";
import Articles from "@components/blog/Articles";

export default function Home() {
  // #########################################################################################
  // le classeur
  // #########################################################################################

  // ================================== GESTION DES ONGLETS ==================================

  const [principalTagActivated, setPrincipalTagActivated] =
    useState<string>("");
  const [secondaryTagActivated, setSecondaryTagActivated] =
    useState<string>("");

  // ================================== DONNEES DE FONCTIONNEMENT DU CLASSEUR ==================================

  // --- définir les onglets principaux
  const principalTagsList = useMemo(() => {
    const list = [
      new PrincipalTag(0, "article.pTag.blog", "blog", "orthographe"),
      new PrincipalTag(1, "article.pTag.langue", "langue", "francais"),
      new PrincipalTag(
        2,
        "article.pTag.maths",
        "mathematiques",
        "mathematiques",
      ),
      new PrincipalTag(3, "article.pTag.art", "art", "grammaire"),

      //id, title, concerned, color
    ];
    return list;
  }, []);

  // --- définir les onglets secondaires
  const secondaryTagsList: SecondaryTag[] = useMemo(() => {
    const list: SecondaryTag[] = [
      new SecondaryTag("lexique", "article.sTag.lexique", "lexique", "langue1"),
      new SecondaryTag("dictee", "main.dictee", "dictee", "langue1"),
      new SecondaryTag(
        "calculmental",
        "main.calculmental",
        "calculmental",
        "mathematiques2",
      ),
    ];
    return list;
  }, []);

  // --- gestion des onglets actifs
  useEffect(() => {
    const { startPrincipalTag } = defineActiveTags(
      principalTagsList,
      secondaryTagsList,
    );
    setPrincipalTagActivated(startPrincipalTag);
    setSecondaryTagActivated("");
  }, [principalTagsList, secondaryTagsList]);

  const [message, setMessage] = useState<string>("");
  // const [action, setAction] = useState<string>("blog");
  let myComponentContent = <Loader />;
  useEffect(() => {
    setMessage("");
    setSecondaryTagActivated("");
  }, [principalTagActivated]);

  myComponentContent = (
    <Articles
      principalTagActivated={principalTagActivated}
      secondaryTagActivated={secondaryTagActivated}
    />
  );

  // #########################################################################################
  // #########################################################################################

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
