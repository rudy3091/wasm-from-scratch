function style() {
  return `
  <style>
    html,
    body {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 100%;
      margin: 0;
    }

    * {
      box-sizing: border-box;
    }

    .row {
      display: flex;
    }

    .cell {
      width: 5px;
      height: 5px;

      // border: 1px solid white;
      background-color: #e5e5e5;
    }

    .cell.on {
      background-color: #48d7e8;
    }
  </style>
  `;
}

export default style;
