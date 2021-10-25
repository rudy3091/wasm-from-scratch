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

  const count = pixelMap.filter(x => x === 1).length;
  console.log(count);
}

function setEvent() {
  const app = document.querySelector("#app")!;
  app.addEventListener("click", (ev) => handleClick(ev as MouseEvent));
}

function start(wasm: WasmType) {
  const wasmTime = getTime(() => {
    const app = document.querySelector("#app")!;
    for (let i = 0; i < HEIGHT; i++) {
      app.appendChild(wasm.makeRow(i, WIDTH));
    }
  }, 1);

  console.log("[wasm]", wasmTime, "ms");
}

async function load() {
  document.head.innerHTML += style();
  document.body.innerHTML += `<div id="app"></div>`
  setEvent();
  start(await import("../pkg"));
}

load();
