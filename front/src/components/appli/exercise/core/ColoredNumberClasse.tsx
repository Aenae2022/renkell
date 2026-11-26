function ColoredNumberClasse({
  nbrDec,
}: {
  nbrDec: { model: string; type: string }[];
}) {
  const classeColors = {
    milliard: "text-conjugaison",
    million: "text-orthographe",
    mille: "text-resolution",
    unite: "text-grammaire",
  };
  return (
    <>
      {nbrDec.map((classe, index) => {
        return (
          <span
            key={`${classe.type}${index}`}
            className={`${classeColors[classe.type as keyof typeof classeColors]}`}
          >
            {classe.model}
          </span>
        );
      })}
    </>
  );
}

export default ColoredNumberClasse;
