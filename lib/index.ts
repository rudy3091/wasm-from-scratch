import style from "./styles";

type WasmType = typeof import("../pkg");

const WIDTH = 100;
const HEIGHT = 100;

const pixelMap = new Uint8Array(WIDTH * HEIGHT);

function getTime(f: () => void, iter: number): number {
  let sum = 0;
  for (let i = 0; i < iter; i++) {
    performance.mark("start");
    f();
    performance.mark("end");
    const result = performance.measure("time", "start", "end");
    performance.clearMarks();
    sum += result.duration;
  }
  return sum / iter;
}

function getIndex(x: number, y: number): number {
  return y + x * WIDTH;
}

function handleClick(ev: MouseEvent) {
  const target = ev.target as HTMLElement;
  target.classList.toggle("on");
  const colIdx = parseInt(target.dataset.cellIdx as string);

  const rowElem = target.closest("[data-row-idx]") as HTMLElement;
  const rowIdx = parseInt(rowElem.dataset.rowIdx as string);
  const prevValue = pixelMap[getIndex(colIdx, rowIdx)];
  pixelMap[getIndex(colIdx, rowIdx)] = prevValue === 0 ? 1 : 0;

  const count = pixelMap.filter((x) => x === 1).length;
  console.log(count);
}

function start(wasm: WasmType) {
  const app = document.querySelector("#app")!;
  app.addEventListener("click", (ev) => handleClick(ev as MouseEvent));
  const button = document.querySelector("#button")!;
  button.addEventListener("click", () => {
    console.log('[wasm]', getTime(() => {
      wasm.findPath(pixelMap);
    }, 1), 'ms');
  });

  for (let i = 0; i < HEIGHT; i++) {
    app.appendChild(wasm.makeRow(i, WIDTH));
  }
  console.log("ready");
  const time = getTime(() => {
    wasm.findPath(pixelMap);
  }, 1);
  console.log("[wasm]", time, "ms");
}

async function load() {
  document.head.innerHTML += style();
  document.body.innerHTML += `
    <div id="app"></div>
    <div>
      <button id="button">wasm-search</button>
    </div>
  `;
  start(await import("../pkg"));
}

load();
