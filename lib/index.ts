import App from "./App";
import style from "./styles";

type WasmType = typeof import("../pkg");

function getTime(f: () => void, iter: number): number {
  let sum = 0;
  for (let i = 0; i < iter; i++) {
    performance.mark('start');
    f();
    performance.mark('end');
    const result = performance.measure('time', 'start', 'end');
    performance.clearMarks();
    sum += result.duration;
  }
  return sum / iter;
}

function start(wasm: WasmType) {
  console.log("clear");
}

async function load() {
  document.head.innerHTML += style();
  document.body.appendChild(App(100, 40));
  start(await import("../pkg"));
}

load();
