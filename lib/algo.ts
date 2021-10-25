import { getIndex } from './index';

export const WIDTH = 1000;
export const HEIGHT = 1000;

const VISITED = new Array(WIDTH * HEIGHT + 1).fill(false);
const MOVES = [[1, 0], [0, 1], [-1, 0], [0, -1]];

export function search(ix: number, iy: number, arr: Uint8Array) {
  const array = Array.from(arr);
  const queue: [number, number][] = [];
  VISITED[getIndex(ix, iy)] = true;
  queue.push([ix, iy]);

  while (queue.length !== 0) {
    const item = queue.shift();
    const x = item![0];
    const y = item![1];

    for (const [dx, dy] of MOVES) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0) { continue; }

      const next = getIndex(nx , ny);
      const inBoundary = 0 < next && next < WIDTH * HEIGHT;
      if (inBoundary && !VISITED[next] && array[next] !== 1) {
        queue.push([nx, ny]);
        VISITED[next] = true;
      }
    }
  }
}
