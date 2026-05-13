import type { Cube } from "./denombre1.types";



export function layoutGrid(cubes: Omit<Cube, "x" | "y">[]): Cube[] {
  const COLS = 10;
  const CELL = 90;

  let col = 0;
  let row = 0;

  return cubes.map(cube => {
    while (isBlocked(col)) {
      col = 0;
      row++;
    }

    const x = col * CELL;
    const y = row * CELL;

    col++;

    return {
      ...cube,
      x,
      y,
    };
  });
}

function isBlocked(col: number) {
  return col === 9; // dernière colonne réservée
}
