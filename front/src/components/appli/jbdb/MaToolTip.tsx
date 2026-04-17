import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
type GeneralBoutonProps = {
  couleur: string;
  data: {
    exId: string;
    description: string;
    shortTitle: string;
    exampleQuestion: string;
    logo: string;
    duration: number;
    exerciseNumber: number;
    objectif: number;
    eca: number;
    calculAGenerer: () => void;
  };
};
export function MaToolTip({ couleur, data }: GeneralBoutonProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const shortTitle = t("jbdb.home.buttons." + data.exId, {
    defaultValue: data.shortTitle,
  });
  const exampleQuestion = t("jbdb.home.questions." + data.exId, {
    defaultValue: data.exampleQuestion,
  });
  const handleClick = (exId: string) => {
    sessionStorage.setItem("generalTag", "2ma");
    sessionStorage.setItem("specificTag", "2ma_calm");
    navigate(`/jbdb/${exId}`);
  };

  const boutonContainerStyle = `relative group h-6 m-2 text-center text-black pl-1 pr-1  cursor-pointer inline-block bg-${couleur}-light mw-6 border-2 border-gray-300 rounded-md`;
  const toolTipStyle =
    "absolute bottom-[110%] left-1/2 -translate-x-1/2 bg-black/45 text-white px-1 py-0.5 rounded-md whitespace-nowrap z-10 hidden group-hover:block";
  return (
    <div
      className={boutonContainerStyle}
      onClick={() => handleClick(data.exId)}
    >
      {shortTitle} {/* Affiche le titre court du bouton */}
      <div className={toolTipStyle}>{exampleQuestion}</div>
    </div>
  );
}

export default MaToolTip;
