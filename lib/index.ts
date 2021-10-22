import App from "./App";
import style from "./styles";

function start(wasm: typeof import("../pkg")) {
  console.log(wasm.add(3, 10));

  const sum = wasm.sumArray();
  console.log(sum);

  const added = wasm.add(3, 4);
  console.log(added); // 7
  // maybe js runs faster on simple arithmetic operation
  // (im not sure about this)

  const array = Int32Array.from(new Array(1001).fill(0));
  console.log(array);
  wasm.findPath(array);
  console.log(array);
}

async function load() {
  document.head.innerHTML += style();
  document.body.appendChild(App(40, 20));
  start(await import("../pkg"));
}

load();
