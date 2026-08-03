import { useTranslation } from "react-i18next";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Cube } from "@srcFront/features/exercises/maths/nombre/denombre1/denombre1.types";
import { animeCorrection } from "@srcFront/features/exercises/maths/nombre/denombre1/denombre1.engine";
import { layoutScatter } from "@srcFront/features/exercises/maths/nombre/denombre1/denombre1.layoutScatter";
import { CUBE_SIZE, CUBE_SRC } from "./cube.constants";
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
  const [cubes, setCubes] = useState<Cube[]>([]);

  const boardRef = useRef<HTMLDivElement>(null);

  const [boardSize, setBoardSize] = useState({
    width: 0,
    height: 0,
  });

  const boardHeight = defineHeight(nombreDec, boardSize.width, CUBE_SIZE);

  useLayoutEffect(() => {
    if (!boardRef.current) return;

    const rect = boardRef.current.getBoundingClientRect();

    setBoardSize({
      width: rect.width,
      height: rect.height,
    });
  }, []);

  useEffect(() => {
    if (itemStatus === "correction") {
      animeCorrection(setCubes, nombreDec);
    }
  }, [itemStatus, nombreDec]);

  useLayoutEffect(() => {
    if (boardSize.width === 0) return;
    setCubes(
      layoutScatter(createCubes(nombreDec), boardSize.width, boardHeight),
    );
  }, [nombreDec, boardSize.width, boardHeight]);

  return (
    <>
      {consigne !== "" ? (
        <h2 className="text-lg text-center">{t(consigne, { lng: langue })}</h2>
      ) : null}

      <div
        ref={boardRef}
        className="relative w-full border overflow-hidden"
        style={{ height: boardHeight }}
      >
        {cubes.map((cube) => {
          if (cube.visible) {
            return <Cube key={cube.id} cube={cube} />;
          }
          return null;
        })}
      </div>
    </>
  );
}

function createCubes(
  nombreDec: NombreDecType,
): Omit<Cube, "x" | "y" | "visible">[] {
  const cubes: Omit<Cube, "x" | "y" | "visible">[] = [];
  let id = 0;

  // 1. création brute (logique métier uniquement)
  for (let i = 0; i < nombreDec.nbCentaine; i++) {
    cubes.push({
      id: `c-${id++}`,
      type: "centaine",
      image: "normal",
    });
  }

  for (let i = 0; i < nombreDec.nbDizaine; i++) {
    cubes.push({
      id: `d-${id++}`,
      type: "dizaine",
      image: "normal",
    });
  }

  for (let i = 0; i < nombreDec.nbUnite; i++) {
    cubes.push({
      id: `u-${id++}`,
      type: "unite",
      image: "normal",
    });
  }

  // 2. shuffle pédagogique (désordre volontaire)
  //const shuffled = Utilitaires.shuffleArray(cubes);

  // 3. layout stable (grille)
  return cubes;
}

function Cube({ cube }: { cube: Cube }) {
  const { t } = useTranslation();
  return (
    <div
      className={`absolute ${
        cube.isMoving ? "transition-transform duration-700" : ""
      }`}
      style={{
        transform: `translate(${cube.x}px, ${cube.y}px)`,
      }}
    >
      <img
        src={CUBE_SRC[cube.type].src[cube.image]}
        alt={t(CUBE_SRC[cube.type].alt)}
        style={{
          width: CUBE_SIZE[cube.type].width,
          height: CUBE_SIZE[cube.type].height,
        }}
      />{" "}
    </div>
  );
}

function defineHeight(
  nbre: NombreDecType,
  widthValue: number,
  baseSize: {
    unite: {
      width: number;
      height: number;
    };
    dizaine: {
      width: number;
      height: number;
    };
    centaine: {
      width: number;
      height: number;
    };
  },
): number {
  const valMin = 100;
  const valMax = 380;
  const OCCUPANCY = 0.6;
  const totalImageArea =
    nbre.nbUnite * baseSize["unite"].width * baseSize["unite"].height +
    nbre.nbDizaine * baseSize["dizaine"].width * baseSize["dizaine"].height +
    nbre.nbCentaine * baseSize["centaine"].width * baseSize["centaine"].height;
  const height = totalImageArea / (widthValue * OCCUPANCY) + 60;
  return Math.min(Math.max(height, valMin), valMax);
}
export default ArdoiseCubes;
