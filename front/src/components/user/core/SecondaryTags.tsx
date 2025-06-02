import { useTranslation } from "react-i18next";
type SecondaryTag = {
    type: string;  //link ou appli
    title : string; //titre de l'onglet
    tagStyle: string; //classname tailwind qui prend en charge une couleur spécifique
    tagStyleSelected: string; //classname tailwind qui prend en charge une couleur spécifique
    tagStyleTagAdd: string; //classname tailwind qui prend en charge une couleur spécifique
    tagSource : string; //référence au tagprincipal.ref
}
type GeneralProps = {
    secondaryTagsList : SecondaryTag[];
    activatedPrincipal: string | null; // ou string si tes IDs sont des strings
    activatedSecondary: string | null; // ou string si tes IDs sont des strings
    setActivatedSecondary: (type: string) => void; // Optionnel si tous les onglets n'ont pas de sous-activation
}
function SecondaryTags({secondaryTagsList, activatedPrincipal, activatedSecondary,  setActivatedSecondary}: GeneralProps) {
    const {t} = useTranslation()
    const mySecondaryTagsList = secondaryTagsList.filter((tag) => tag.tagSource === activatedPrincipal)
  return (
    <div className="flex flex-col pt-5">
        {mySecondaryTagsList.map((tag) => {
            const isSelected = activatedSecondary === tag.type ? true : false
            const secondaryTagsStyle = isSelected ? tag.tagStyleSelected : tag.tagStyle;
            const secondaryTagsStyleTag = isSelected ? tag.tagStyleTagAdd : "absolute left-0 right-0 bottom-[-10px] bg-blue-500 h-0";
            return(
            
                <div className="relative" key={tag.type}>
                    <div className={`${secondaryTagsStyle}`}
                        onClick={() => {
                            setActivatedSecondary(tag.type)
                            sessionStorage.setItem('secondaryTag', tag.type)}}>
                        {t(tag.title)}
                    </div>
                    <div className={`${secondaryTagsStyleTag}`}></div>
                </div>
            )})}
    </div> 

  )
}

export default SecondaryTags