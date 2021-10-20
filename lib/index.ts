function start(wasm: typeof import("../pkg")) {
  console.log(wasm.add(3, 10));

  const sum = wasm.sumArray();
  console.log(sum);

  const added = wasm.add(3, 4);
  console.log(added); // 7

  const plus3 = wasm.testModule(3);
  console.log(plus3);

  const arr = Int32Array.from(new Array(1000000).fill(10));
  console.time('wasm');
  const sum2 = wasm.getSum(arr);
  console.timeEnd('wasm'); // 134.54 ms
  console.log(sum2);

  console.time('js');
  const sum3 = arr.reduce((acc, x) => acc + x, 0);
  console.timeEnd('js'); // 8.8 ms
  console.log(sum3);

  // maybe js runs faster on simple arithmetic operation
  // (im not sure about this)
}

async function load() {
  start(await import("../pkg"));
}

load();
