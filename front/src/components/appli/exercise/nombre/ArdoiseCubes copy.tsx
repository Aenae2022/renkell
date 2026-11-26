import iconUnite from "@pictures/exercice/nombre/unite.png";
import iconDizaine from "@pictures/exercice/nombre/dizaine.png";
import iconCentaine from "@pictures/exercice/nombre/centaine.png";
import { Utilitaires } from "@utils/Utilitaires";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import type { Cube } from "@srcFront/features/exercises/maths/nombre/denombre1/denombre1.types";
import { layoutGrid } from "@srcFront/features/exercises/maths/nombre/denombre1/denombre1.layout";
import { animeCorrection } from "@srcFront/features/exercises/maths/nombre/denombre1/denombre1.engine";
type NombreDecType = {
  nbUnite: number;
  nbDizaine: number;
  nbCentaine: number;
};
type ArdoiseCubesProps = {
  consigne: string;
  langue: string;
  nombreDec: NombreDecType;
  itemStatus: string;
};

function ArdoiseCubes({
  consigne,
  langue,
  nombreDec,
  itemStatus,
}: ArdoiseCubesProps) {
  const { t } = useTranslation();
  const [cubes, setCubes] = useState(() => layoutGrid(createCubes(nombreDec)));
  useEffect(() => {
    if (itemStatus === "correction") {
      animeCorrection(setCubes, nombreDec);
    }
  }, [itemStatus, nombreDec]);
  useEffect(() => {
    setCubes(layoutGrid(createCubes(nombreDec)));
  }, [nombreDec]);
  return (
    <>
      {consigne !== "" ? (
        <h2 className="text-lg text-center">{t(consigne, { lng: langue })}</h2>
      ) : null}

      <div className="relative w-[900px] h-[400px] border">
        {cubes.map((cube) => (
          <Cube key={cube.id} cube={cube} />
        ))}
      </div>
    </>
  );
}

function createCubes(nombreDec: NombreDecType): Cube[] {
  const cubes: Omit<Cube, "x" | "y">[] = [];
  let id = 0;

  // 1. création brute (logique métier uniquement)
  for (let i = 0; i < nombreDec.nbUnite; i++) {
    cubes.push({
      id: `u-${id++}`,
      type: "unite",
      src: iconUnite,
    });
  }

  for (let i = 0; i < nombreDec.nbDizaine; i++) {
    cubes.push({
      id: `d-${id++}`,
      type: "dizaine",
      src: iconDizaine,
    });
  }

  for (let i = 0; i < nombreDec.nbCentaine; i++) {
    cubes.push({
      id: `c-${id++}`,
      type: "centaine",
      src: iconCentaine,
    });
  }

  // 2. shuffle pédagogique (désordre volontaire)
  const shuffled = Utilitaires.shuffleArray(cubes);

  // 3. layout stable (grille)
  return layoutGrid(shuffled);
}

function Cube({ cube }: { cube: Cube }) {
  const sizeMap = {
    unite: "w-[20px] ",
    dizaine: "w-[67px]",
    centaine: "w-[87px]",
  };

  return (
    <div
      className="absolute w-[100px] h-[100px] flex items-end justify-start transition-all duration-800"
      style={{
        transform: `translate(${cube.x}px, ${cube.y}px)`,
      }}
    >
      <img src={cube.src} alt="cubes" className={`${sizeMap[cube.type]}`} />
    </div>
  );
}
export default ArdoiseCubes;
