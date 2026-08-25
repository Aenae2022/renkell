import type { BaseSizeType, RepresentationType } from "@srcFront/features/exercises/maths/nombre/denombre1/denombre1.types";
import { buildCandidatePositions } from "@utils/design/buildCandidatePositions";
import { stayInBorder } from "@utils/design/stayInBorder";
import { Matematik } from "@utils/Matematik";

type Position = {
  x: number;
  y: number;
};

export function layoutScatter(
  elts: Omit<RepresentationType, "x" | "y" | "visible">[],
  boardWidth: number,
  boardHeight: number,
  baseSize: BaseSizeType,
): RepresentationType[] {

  
  const positions: Position[] = buildCandidatePositions(boardWidth, boardHeight);
  const placedElts: RepresentationType[] = [];

  for (const [index, elt] of elts.entries()) {
  if (!elt) {
    console.error("Cube undefined", { index, elts });
  }

  if (!baseSize[elt.type]) {
    console.error("Type inconnu", { index, elt });
  }

  

    let placed = false;
    for (let i = 0; i < positions.length; i++) {

      const position = positions[i];

      // le cube doit rester dans l'ardoise
      if (
        position.x + baseSize[elt.type].width > boardWidth ||
        position.y + baseSize[elt.type].height > boardHeight
      ) {
        continue;
      }

      if (
        isColliding(
          elt.type,
          position.x,
          position.y,
          placedElts,
          baseSize
        )
      ) {
        continue;
      }

      placedElts.push({
        ...elt,
        x: position.x,
        y: position.y,
        visible: true,
      });

      // cette position ne sera plus jamais utilisée
      positions.splice(i, 1);
      placed = true;
      break;
    }
    if (!placed) {
        const indexAlea = Matematik.entierAleatoire(0, positions.length)
        
        const place = positions[indexAlea]
        const newPlace = stayInBorder(place.x, place.y, boardWidth, boardHeight, baseSize[elt.type].width, baseSize[elt.type].height)
        placedElts.push({
        ...elt,
        x: newPlace.x,
        y: newPlace.y,
        visible: true,
      });
      positions.splice(indexAlea, 1);
    }
  }
  
  return placedElts;
}

const MARGIN = 6;

function isColliding(
  type: RepresentationType["type"],
  x: number,
  y: number,
  placedElts: RepresentationType[],
  baseSize: BaseSizeType,
) {
  const size = baseSize[type];

  return placedElts.some((elt) => {
    const other = baseSize[elt.type];

    return !(
      x + size.width + MARGIN < elt.x ||
      x > elt.x + other.width + MARGIN ||
      y + size.height + MARGIN < elt.y ||
      y > elt.y + other.height + MARGIN
    );
  });
}

