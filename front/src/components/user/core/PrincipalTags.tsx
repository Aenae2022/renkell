import { useTranslation } from "react-i18next";
import {
  type PrincipalTagType,
  type SecondaryTagType,
} from "@shared/schema/tags.schema";

type GeneralProps = {
  principalTagsList: PrincipalTagType[];
  secondaryTagsList: SecondaryTagType[];
  activatedPrincipal: string; // ou string si tes IDs sont des strings
  setPrincipalTagActivated: (ref: string) => void; // Fonction qui prend un ID et met à jour l'état
  setSecondaryTagActivated: (type: string) => void; // Optionnel si tous les onglets n'ont pas de sous-activation
};
function PrincipalTags({
  principalTagsList,
  secondaryTagsList,
  activatedPrincipal,
  setPrincipalTagActivated,
  setSecondaryTagActivated,
}: GeneralProps) {
  const { t } = useTranslation();
  const handleClickPrincipalTag = (tagRef: string) => {
    //1 récupérer le type de principal
    const newPrincipalTagRef = tagRef;
    //2 récupérer le premier secondary du nouveau principal si existe
    const firstSecondaryTag = secondaryTagsList.find(
      (tag) => tag.tagSource === newPrincipalTagRef
    )?.type;
    let startSecondaryTag = "";
    if (firstSecondaryTag) {
      const storedSecondaryTag = localStorage.getItem("secondaryTag");
      //pas de tag en mémoire
      if (storedSecondaryTag === null || storedSecondaryTag === "") {
        startSecondaryTag = firstSecondaryTag;
      } else {
        //tag en mémoire, on vérifie le match avec le tag principal
        const storedSecondaryTagValid = secondaryTagsList.find(
          (sTag) =>
            sTag.type === storedSecondaryTag &&
            sTag.tagSource === newPrincipalTagRef
        );
        if (!storedSecondaryTagValid) {
          //si le tag est valid on ne fait rien, sinon on le remplace pour le first
          startSecondaryTag = firstSecondaryTag;
        } else {
          startSecondaryTag = storedSecondaryTag;
        }
      }
    }
    //3 mettre à jour les états
    setPrincipalTagActivated(newPrincipalTagRef);
    setSecondaryTagActivated(startSecondaryTag);
    //4 Mettre à jour le localstorage
    localStorage.setItem("principalTag", newPrincipalTagRef);
    localStorage.setItem("secondaryTag", startSecondaryTag);
  };
  return (
    <div className="pl-24 flex items-end">
      {principalTagsList.map((tag) => {
        const isSelected = activatedPrincipal === tag.ref ? true : false;
        const generalTagsStyle = isSelected
          ? tag.tagStyleSelected
          : tag.tagStyle;
        const generalTagsStyleTag = isSelected
          ? tag.tagStyleTagAdd
          : "absolute left-0 right-0 bottom-[-10px] bg-blue-500 h-0";

        return (
          <div className="relative" key={tag.ref}>
            <div
              className={`${generalTagsStyle} ${isSelected}`}
              onClick={() => handleClickPrincipalTag(tag.ref)}
            >
              {t(tag.title)}
            </div>
            <div className={`${generalTagsStyleTag}`}></div>
          </div>

          // <GeneralTags key={tag.id} tagId={tag.id} tagName={tagName} activated={principalTagActivated} setActivated={setTagActivated} setSubActivated={setSubTagActivated}/>
        );
      })}
    </div>
  );
}

export default PrincipalTags;
