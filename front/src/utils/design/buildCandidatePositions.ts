import { Utilitaires } from "@utils/Utilitaires";

type Position = {
  x: number;
  y: number;
};

export  function buildCandidatePositions(
  boardWidth: number,
  boardHeight: number
): Position[] {
    const positions: Position[] = [];

    const STEP = 10;
    const JITTER = STEP * 0.5;
    const PADDING = 5;
    

    for(let y = PADDING; y < boardHeight - PADDING; y += STEP) {
        for(let x = PADDING; x < boardWidth - PADDING; x += STEP) {
            const jitteredX = x + (Math.random() * 2 - 1) * JITTER;
            const jitteredY = y + (Math.random() * 2 - 1) * JITTER;
            positions.push({ x: jitteredX, y: jitteredY });
        }
    }

    return Utilitaires.shuffleArray(positions);
    //return positions;
}