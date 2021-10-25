import style from "./styles";

type WasmType = typeof import("../pkg");

const WIDTH = 200;
const HEIGHT = 100;

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
  start(await import("../pkg"));
}

load();
