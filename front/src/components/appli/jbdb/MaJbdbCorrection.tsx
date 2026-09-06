import { Matematik } from "@utils/Matematik";
type GeneralCorrectionProps = {
  item: {
    question: string;
    resultats: { texte: string; valeurRep: number }[];
    reponses: (string | number)[][];
    indexCalcul: number;
    validation: boolean;
  };
  indice: number;
  count: number;
};

export default function MaJbdbCorrection({
  item,
  indice,
  count,
}: GeneralCorrectionProps) {
  const counter = count + indice + 1;

  const textReponseColorVariants = {
    reponseValid: "text-lime-500",
    reponseInvalid: "text-red-600",
  };
  const reponse = item.reponses.map((reponse, indice) => {
    let textReponse = "";
    let validation = item.validation;
    if (indice > 1) {
      textReponse = " / ";
    }
    //mettre en rouge les réponse eronées
    if (validation && indice < item.reponses.length - 1) {
      validation = false;
    }
    reponse.map((rep, indice) => {
      const textAdd = item.resultats[indice].texte;
      textReponse += textAdd;
      textReponse +=
        typeof rep === "number"
          ? Matematik.ecrireNombreEnChiffreEspace(rep).nombreEnchiffre
          : `${rep}   `;
      return textReponse;
    });
    const textReponseStyle = validation
      ? textReponseColorVariants[
          "reponseValid" as keyof typeof textReponseColorVariants
        ]
      : textReponseColorVariants[
          "reponseInvalid" as keyof typeof textReponseColorVariants
        ];
    return (
      <span
        className={textReponseStyle}
        key={`${validation ? "valid" : "unvalid"}-${indice}`}
      >
        {textReponse}
      </span>
    );
  });

  const resultats = item.resultats.map(
    (quest) =>
      `${quest.texte} ${Matematik.ecrireNombreEnChiffreEspace(quest.valeurRep).nombreEnchiffre} `,
  );
  return (
    <>
      <td className="bg-neutral-600 pl-1 pr-1">{counter}</td>
      <td className="whitespace-nowrap overflow-hidden text-ellipsis text-[0.8em] max-w-full break-words">
        {item.question}
      </td>
      <td className="text-[1.1em] px-[5px] font-bold text-left">
        {reponse}
        {!item.validation && (
          <span className="text-[clamp(0.2em,3vw,0.5em)] whitespace-nowrap overflow-hidden text-ellipsis italic pl-[5px]">
            ({resultats})
          </span>
        )}
      </td>
    </>
  );
}
