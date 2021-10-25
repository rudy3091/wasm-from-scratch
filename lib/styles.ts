function style() {
  return `
  <style>
    html,
    body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 100%;
      margin: 0;
    }

    * {
      box-sizing: border-box;
    }

    #app {
      margin-bottom: 10px;
    }

    button {
      padding: 10px;
      border: 2px solid black;
      border-radius: 4px;
      background-color: transparent;
      font-weight: 600;
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
