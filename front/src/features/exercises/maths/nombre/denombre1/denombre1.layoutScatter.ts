import type { Cube } from "@srcFront/features/exercises/maths/nombre/denombre1/denombre1.types";
import { CUBE_SIZE } from "@components/appli/exercise/nombre/cube.constants";
import { buildCandidatePositions } from "@utils/design/buildCandidatePositions";
import { Matematik } from "@utils/Matematik";

type Position = {
  x: number;
  y: number;
};

export function layoutScatter(
  cubes: Omit<Cube, "x" | "y" | "visible">[],
  boardWidth: number,
  boardHeight: number
): Cube[] {

  const positions: Position[] = buildCandidatePositions(boardWidth, boardHeight);
  const placedCubes: Cube[] = [];

  for (const [index, cube] of cubes.entries()) {
  if (!cube) {
    console.error("Cube undefined", { index, cubes });
  }

  if (!CUBE_SIZE[cube.type]) {
    console.error("Type inconnu", { index, cube });
  }

  

    let placed = false;
    for (let i = 0; i < positions.length; i++) {

      const position = positions[i];

      // le cube doit rester dans l'ardoise
      if (
        position.x + CUBE_SIZE[cube.type].width > boardWidth ||
        position.y + CUBE_SIZE[cube.type].height > boardHeight
      ) {
        continue;
      }

      if (
        isColliding(
          cube.type,
          position.x,
          position.y,
          placedCubes
        )
      ) {
        continue;
      }

      placedCubes.push({
        ...cube,
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
        console.warn("Impossible de placer", cube);
        const place = positions[Matematik.entierAleatoire(0, positions.length-1)]
        placedCubes.push({
        ...cube,
        x: place.x,
        y: place.y,
        visible: true,
      });
    }
  }
  console.log(
  "Placés :", placedCubes.length,
  "Demandés :", cubes.length
);
console.log(
  "Positions restantes :", positions.length,
  "Cubes placés :", placedCubes.length
);
  return placedCubes;
}

const MARGIN = 6;

function isColliding(
  type: Cube["type"],
  x: number,
  y: number,
  placedCubes: Cube[]
) {
  const size = CUBE_SIZE[type];

  return placedCubes.some((cube) => {
    const other = CUBE_SIZE[cube.type];

    return !(
      x + size.width + MARGIN < cube.x ||
      x > cube.x + other.width + MARGIN ||
      y + size.height + MARGIN < cube.y ||
      y > cube.y + other.height + MARGIN
    );
  });
}

