export const pixelMap = [
  new Array(40).fill(0),
  new Array(40).fill(0),
  new Array(40).fill(0),
  new Array(40).fill(0),
  new Array(40).fill(0),

  new Array(40).fill(0),
  new Array(40).fill(0),
  new Array(40).fill(0),
  new Array(40).fill(0),
  new Array(40).fill(0),

  new Array(40).fill(0),
  new Array(40).fill(0),
  new Array(40).fill(0),
  new Array(40).fill(0),
  new Array(40).fill(0),

  new Array(40).fill(0),
  new Array(40).fill(0),
  new Array(40).fill(0),
  new Array(40).fill(0),
  new Array(40).fill(0),
]

function handleClick(ev: MouseEvent) {
  const target = ev.target as HTMLElement;
  target.classList.toggle("on");
  const colIdx = parseInt(target.dataset.cellIdx as string);

  const rowElem = target.closest("[data-row-idx]") as HTMLElement;
  const rowIdx = parseInt(rowElem.dataset.rowIdx as string);
  const prevValue = pixelMap[rowIdx][colIdx];
  pixelMap[rowIdx][colIdx] = !prevValue;

  const count = pixelMap.flat().filter(x => x).length;
  console.log(count);
}

function App(w: number, h: number) {
  const makeCell = (idx: number) =>
    `<div class="cell" data-cell-idx="${idx}"></div>`;
  const makeRow = (idx: number) =>
    `<div class="row" data-row-idx="${idx}">${new Array(w)
      .fill(null)
      .map((_, i) => makeCell(i))
      .join("")}</div>`;
  const arr = new Array(h).fill(null);

  const container = document.createElement("div");
  container.innerHTML = arr.map((_, i) => makeRow(i)).join("");
  container.addEventListener("click", handleClick);

  return container;
}

export default App;
