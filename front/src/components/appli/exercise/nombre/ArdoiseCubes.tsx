import { useTranslation } from "react-i18next";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  type RepresentationType,
  type BaseSizeType,
  type BaseSrcType,
} from "@srcFront/features/exercises/maths/nombre/denombre1/denombre1.types";
import { animeCorrection } from "@srcFront/features/exercises/maths/nombre/denombre1/denombre1.engine";
import { layoutScatter } from "@srcFront/features/exercises/maths/nombre/denombre1/denombre1.layoutScatter";
import { CUBE_SIZE, CUBE_SRC } from "./cube.constants";
import { MONNAIE_SIZE, MONNAIE_SRC } from "./monnaie.constants";
type NombreDecType = {
  nbUnite: number;
  nbDizaine: number;
  nbCentaine: number;
};
type ArdoiseCubesProps = {
  nombreDec: NombreDecType;
  itemStatus: string;
  typeQuestion: number;
};

function ArdoiseCubes({
  nombreDec,
  itemStatus,
  typeQuestion,
}: ArdoiseCubesProps) {
  // const { t } = useTranslation();
  let baseSize = CUBE_SIZE;
  let baseSrc = CUBE_SRC;
  if (typeQuestion === 2) {
    baseSize = MONNAIE_SIZE;
    baseSrc = MONNAIE_SRC;
  }
  const [representations, setRepresentations] = useState<RepresentationType[]>(
    [],
  );

  const boardRef = useRef<HTMLDivElement>(null);

  const [boardSize, setBoardSize] = useState({
    width: 0,
    height: 0,
  });

  const boardHeight = defineHeight(nombreDec, boardSize.width, baseSize);

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
      animeCorrection(
        setRepresentations,
        nombreDec,
        baseSize,
        boardSize.width,
        boardHeight,
      );
    }
  }, [baseSize, boardHeight, boardSize.width, itemStatus, nombreDec]);

  useLayoutEffect(() => {
    if (boardSize.width === 0) return;
    setRepresentations(
      layoutScatter(
        createRepresentations(nombreDec),
        boardSize.width,
        boardHeight,
        baseSize,
      ),
    );
  }, [nombreDec, boardSize.width, boardHeight, baseSize]);

  return (
    <div
      ref={boardRef}
      className="relative w-full border overflow-hidden"
      style={{ height: boardHeight }}
    >
      {representations.map((representation) => {
        if (representation.visible) {
          return (
            <Representation
              key={representation.id}
              elt={representation}
              baseSize={baseSize}
              baseSrc={baseSrc}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

function createRepresentations(
  nombreDec: NombreDecType,
): Omit<RepresentationType, "x" | "y" | "visible">[] {
  const elts: Omit<RepresentationType, "x" | "y" | "visible">[] = [];
  let id = 0;

  // 1. création brute (logique métier uniquement)
  for (let i = 0; i < nombreDec.nbCentaine; i++) {
    elts.push({
      id: `c-${id++}`,
      type: "centaine",
      image: "normal",
    });
  }

  for (let i = 0; i < nombreDec.nbDizaine; i++) {
    elts.push({
      id: `d-${id++}`,
      type: "dizaine",
      image: "normal",
    });
  }

  for (let i = 0; i < nombreDec.nbUnite; i++) {
    elts.push({
      id: `u-${id++}`,
      type: "unite",
      image: "normal",
    });
  }

  return elts;
}

function Representation({
  elt,
  baseSize,
  baseSrc,
}: {
  elt: RepresentationType;
  baseSize: BaseSizeType;
  baseSrc: BaseSrcType;
}) {
  const { t } = useTranslation();
  return (
    <div
      className={`absolute ${
        elt.isMoving ? "transition-transform duration-700" : ""
      }`}
      style={{
        transform: `translate(${elt.x}px, ${elt.y}px)`,
      }}
    >
      <img
        src={baseSrc[elt.type].src[elt.image]}
        alt={t(baseSrc[elt.type].alt)}
        style={{
          width: baseSize[elt.type].width,
          height: baseSize[elt.type].height,
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
