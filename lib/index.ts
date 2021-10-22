import App from "./App";
import style from "./styles";

function getTime(f: () => void, iter: number): number {
  let sum = 0;
  for (let i = 0; i < iter; i++) {
    const start = Date.now();
    f();
    const end = Date.now();
    sum += end - start;
  }
  return sum / iter;
}

function start(wasm: typeof import("../pkg")) {
  console.log(wasm.add(3, 10));

  const sum = wasm.sumArray();
  console.log(sum);

  const added = wasm.add(3, 4);
  console.log(added); // 7
  // maybe js runs faster on simple arithmetic operation
  // (im not sure about this)

  // let array = Int32Array.from(new Array(100000));
  let array = new Int32Array(1000000);
  const wasmTime = getTime(() => {
    wasm.makeArray(array);
  }, 100);
  console.log("[wasm]", wasmTime);

  const jsTime = getTime(() => {
    Int32Array.from(new Array(1000000).fill(1));
    // new Int32Array(new Array(1000000).fill(1));
  }, 100);
  console.log("[js]", jsTime);
  // performance dramatically improved using wasm when building
  // new array filled with specific value
}

async function load() {
  document.head.innerHTML += style();
  document.body.appendChild(App(40, 20));
  start(await import("../pkg"));
}

load();
