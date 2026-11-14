function ColoredNumberRang({
  nbrDec,
}: {
  nbrDec: { nbUnite: number; nbDizaine: number; nbCentaine: number };
}) {
  return (
    <>
      {nbrDec.nbCentaine !== 0 && (
        <span className="text-nombre">{nbrDec.nbCentaine}</span>
      )}
      {nbrDec.nbCentaine !== 0 || nbrDec.nbDizaine !== 0 ? (
        <span className="text-francais">{nbrDec.nbDizaine}</span>
      ) : null}
      <span className="text-grammaire">{nbrDec.nbUnite}</span>
    </>
  );
}

export default ColoredNumberRang;
