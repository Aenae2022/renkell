import PrincipalTags from "./PrincipalTags";
import SecondaryTags from "./SecondaryTags";
import CarnetSpiraleMini from "../../../assets/pictures/fond/CarnetSpiraleMini.jpg";
import CarnetSpiraleFond from "../../../assets/pictures/fond/CarnetSpiraleFond.jpg";
import {
  type PrincipalTagType,
  type SecondaryTagType,
} from "@shared/schema/tags.schema";
type GeneralProps = {
  principalTagsList: PrincipalTagType[];
  secondaryTagsList: SecondaryTagType[];
  activatedPrincipal: string;
  activatedSecondary: string;
  setPrincipalTagActivated: (ref: string) => void; // Fonction qui prend un ID et met à jour l'état
  setSecondaryTagActivated: (type: string) => void; // Optionnel si tous les onglets n'ont pas de sous-activation
  children: React.ReactNode;
};
function ClasseurVierge({
  principalTagsList,
  secondaryTagsList,
  children,
  activatedPrincipal,
  activatedSecondary,
  setPrincipalTagActivated,
  setSecondaryTagActivated,
}: GeneralProps) {
  return (
    <div className="w-[100%]">
      <PrincipalTags
        principalTagsList={principalTagsList}
        secondaryTagsList={secondaryTagsList}
        activatedPrincipal={activatedPrincipal}
        setPrincipalTagActivated={setPrincipalTagActivated}
        setSecondaryTagActivated={setSecondaryTagActivated}
      />
      <div className="flex">
        <div
          className="rounded w-full pl-20 mr-3 pr-3 py-5 min-h-[300px] bg-repeat-y bg-left-top"
          style={{
            backgroundImage: `url(${CarnetSpiraleMini}), url(${CarnetSpiraleFond})`,
            backgroundRepeat: "repeat-y, repeat",
            backgroundPosition: "top left, top left",
          }}
        >
          {children}
        </div>
        <SecondaryTags
          secondaryTagsList={secondaryTagsList}
          activatedPrincipal={activatedPrincipal}
          activatedSecondary={activatedSecondary}
          setActivatedSecondary={setSecondaryTagActivated}
        />
      </div>
    </div>
  );
}

export default ClasseurVierge;
