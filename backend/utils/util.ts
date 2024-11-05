export function calculateScore(size: number, timeInSeconds: number): number {
  const SCORE_FACTOR = 1000;
  const score = (size / timeInSeconds) * SCORE_FACTOR;
  return score;
}

export function generateGameElements(size: number): number[][] {
  const gameElements: number[][] = [];

  // Fill the game elements
  for (let i = 1; i <= size; i++) {
    const currentRow = [];
    for (let j = 1; j <= size; j++) {
      currentRow.push(j);
    }
    gameElements.push(currentRow);
  }

  // Shuffle the elements array
  for (let i = gameElements.length - 1; i > 0; i--) {
    for (let j = gameElements[i].length - 1; j > 0; j--) {
      const randRow = Math.floor(Math.random() * (i + 1));
      const randCol = Math.floor(Math.random() * (j + 1));
      [gameElements[i][j], gameElements[randRow][randCol]] = [
        gameElements[randRow][randCol],
        gameElements[i][j],
      ];
    }
  }

  return gameElements;
}

export function validateMove(
  gameElements: number[][],
  from: [number, number],
  to: [number, number]
): boolean {
  const outOfBound = (val: number) => val < 0 || val >= gameElements.length;
  if (from.some(outOfBound) || to.some(outOfBound)) {
    return false;
  }

  const [x_from, y_from] = from;
  const [x_to, y_to] = to;

  if (
    (x_from == x_to && Math.abs(y_from - y_to) == 1) ||
    (y_from == y_to && Math.abs(x_from - x_to))
  ) {
    [gameElements[x_from][y_from], gameElements[x_to][y_to]] = [
      gameElements[x_to][y_to],
      gameElements[x_from][y_from],
    ];
    return true;
  }

  return false;
}

export function isUserWin(gameElements: number[][]): boolean {
  for (let row of gameElements) {
    for (let i = 1; i <= gameElements.length; i++) {
      if (row[i - 1] !== i) return false;
    }
  }
  return true;
}
