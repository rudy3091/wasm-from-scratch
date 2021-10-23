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
  /*
  {
    // let array = Int32Array.from(new Array(100000));
    let array = new Int32Array(1000000);
    const wasmTime = getTime(() => {
      wasm.makeArray(array);
    }, 100);
    console.log("[wasm]", wasmTime);

    const jsTime = getTime(() => {
      new Array(1000000).fill(1);
      // Int32Array.from(new Array(1000000).fill(1));
      // new Int32Array(new Array(1000000).fill(1));
    }, 100);
    console.log("[js]", jsTime);
  }

  {
    // let array = Int32Array.from(new Array(100000));
    const array = new Uint8Array(1000000);
    const wasmTime = getTime(() => {
      wasm.makeUint8array(array);
    }, 100);
    console.log("[wasm]", wasmTime);

    const jsTime = getTime(() => {
      // new Array(1000000).fill(1);
      // Uint8Array.from(new Array(1000000).fill(1));
      new Uint8Array(new Array(1000000).fill(1));
    }, 100);
    console.log("[js]", jsTime);
  }

  {
    const array = new Array(1000000).fill(1);
    const typedArray = new Int32Array(array);

    console.log("[array]", getTime(() => {
      array.reduce((acc, x) => acc + x, 0)
    }, 100));
    console.log("[typed array]", getTime(() => {
      typedArray.reduce((acc, x) => acc + x, 0)
    }, 100));
  }
  */

  function makeRow(n: number): Element {
    const row = document.createElement("div");
    row.className = 'row';
    row.setAttribute('data-row-idx', '3');
    for (let i = 0; i < n; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      row.appendChild(cell);
    }
    return row;
  }

  console.log('[wasm]', getTime(() => {
    wasm.makeRow(10000);
  }, 100));

  console.log('[js]', getTime(() => {
    makeRow(10000);
  }, 100));
}

async function load() {
  document.head.innerHTML += style();
  document.body.appendChild(App(40, 20));
  start(await import("../pkg"));
}

load();
