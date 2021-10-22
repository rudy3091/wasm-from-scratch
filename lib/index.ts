import App from "./App";
import style from "./styles";

function start(wasm: typeof import("../pkg")) {
  console.log(wasm.add(3, 10));

  const sum = wasm.sumArray();
  console.log(sum);

  const added = wasm.add(3, 4);
  console.log(added); // 7

  const plus3 = wasm.testModule(3);
  console.log(plus3);

  const arr = Int32Array.from(new Array(1000000).fill(10));
  console.time("wasm");
  const sum2 = wasm.getSum(arr);
  console.timeEnd("wasm"); // 134.54 ms
  console.log(sum2);

  console.time("js");
  const sum3 = arr.reduce((acc, x) => acc + x, 0);
  console.timeEnd("js"); // 8.8 ms
  console.log(sum3);

  let a = Date.now();
  const arr2 = wasm.hi();
  let b = Date.now();
  console.log(`[wasm]: ${b - a} ms`);
  console.log(arr2);

  a = Date.now();
  const arr3 = [];
  for (let i = 0; i < 100000; i++) {
    arr3.push(10);
  }
  b = Date.now();
  console.log(`[js]: ${b - a} ms`);

  // maybe js runs faster on simple arithmetic operation
  // (im not sure about this)
}

async function load() {
  document.head.innerHTML += style();
  document.body.appendChild(App(40, 20));
  start(await import("../pkg"));
}

load();
