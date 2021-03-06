//Swipe right
export function shiftRight(grid) {
  for (let i = 0; i < 16; i++) {
    if (i % 4 == 0) {
      let totalOne = grid[i];
      let totalTwo = grid[i + 1];
      let totalThree = grid[i + 2];
      let totalFour = grid[i + 3];
      let row = [totalOne, totalTwo, totalThree, totalFour];

      let filteredRow = row.filter((num) => num);
      let missing = 4 - filteredRow.length;
      let zeroes = Array(missing).fill(0);
      let newRow = zeroes.concat(filteredRow);

      grid[i] = newRow[0];
      grid[i + 1] = newRow[1];
      grid[i + 2] = newRow[2];
      grid[i + 3] = newRow[3];
    }
  }
}

//Swipe left
export function shiftLeft(grid) {
  for (let i = 0; i < 16; i++) {
    if (i % 4 == 0) {
      let totalOne = grid[i];
      let totalTwo = grid[i + 1];
      let totalThree = grid[i + 2];
      let totalFour = grid[i + 3];
      let row = [totalOne, totalTwo, totalThree, totalFour];

      let filteredRow = row.filter((num) => num);
      let missing = 4 - filteredRow.length;
      let zeroes = Array(missing).fill(0);
      let newRow = filteredRow.concat(zeroes);

      grid[i] = newRow[0];
      grid[i + 1] = newRow[1];
      grid[i + 2] = newRow[2];
      grid[i + 3] = newRow[3];
    }
  }
}

export function combineRow(grid, direction) {
  for (let i = 0; i < 15; i++) {
    if (i != 3 && i != 7 && i != 11) {
      if (grid[i] == grid[i + 1]) {
        let combinedTotal = grid[i] + grid[i + 1];

        if (direction == 1) {
          grid[i] = combinedTotal;
          grid[i + 1] = 0;
        }

        if (direction == 2) {
          grid[i] = 0;
          grid[i + 1] = combinedTotal;
          i += 1;
        }
      }
    }
  }
}

//Swipe down
export function shiftDown(grid) {
  for (let i = 0; i < 4; i++) {
    let totalOne = grid[i];
    let totalTwo = grid[i + 4];
    let totalThree = grid[i + 8];
    let totalFour = grid[i + 12];
    let column = [totalOne, totalTwo, totalThree, totalFour];

    let filteredColumn = column.filter((num) => num);
    let missing = 4 - filteredColumn.length;
    let zeroes = Array(missing).fill(0);
    let newColumn = zeroes.concat(filteredColumn);

    grid[i] = newColumn[0];
    grid[i + 4] = newColumn[1];
    grid[i + 8] = newColumn[2];
    grid[i + 12] = newColumn[3];
  }
}

//Swipe up
export function shiftUp(grid) {
  for (let i = 0; i < 4; i++) {
    let totalOne = grid[i];
    let totalTwo = grid[i + 4];
    let totalThree = grid[i + 8];
    let totalFour = grid[i + 12];
    let column = [totalOne, totalTwo, totalThree, totalFour];

    let filteredColumn = column.filter((num) => num);
    let missing = 4 - filteredColumn.length;
    let zeroes = Array(missing).fill(0);
    let newColumn = filteredColumn.concat(zeroes);

    grid[i] = newColumn[0];
    grid[i + 4] = newColumn[1];
    grid[i + 8] = newColumn[2];
    grid[i + 12] = newColumn[3];
  }
}

export function combineColumn(grid, direction) {
  for (let i = 0; i < 12; i++) {
    if (grid[i] == grid[i + 4]) {
      let combinedTotal = grid[i] + grid[i + 4];
      if (direction == 1) {
        grid[i] = combinedTotal;
        grid[i + 4] = 0;
      }
      if (direction == 2) {
        grid[i] = 0;
        grid[i + 4] = combinedTotal;
      }
    }
  }
}

//Checks if moves are still available
export function movesLeft(grid) {
  let currentSet = new Set();

  let columns = [];
  let exit = false;

  const arrayColumn = (arr, n) => arr.map((x) => x[n]);

  for (let i = 0; i < 4; i++) {
    columns.push(arrayColumn(grid, i));
  }

  grid.forEach((item) => {
    if (exit) {
      return;
    }

    if (item.includes(0)) {
      exit = true;
      return;
    }
  });

  if (exit) {
    return true;
  }

  [...grid, ...columns].forEach((item) => {
    currentSet.add(...item);

    if (exit) {
      return true;
    }

    if (currentSet.size !== 4) {
      for (let i = 0; i < 3; i++) {
        if (item[i] === item[i + 1] && item[i] !== 0) {
          exit = true;
          break;
        }
      }
    }

    currentSet.clear();
  });

  if (exit) {
    return true;
  }

  return false;
}

export function checkRight(grid) {
  let tempGrid = [];
  let testGrid = tempGrid.concat(grid);

  shiftRight(testGrid);
  combineRow(testGrid, 2);
  shiftRight(testGrid);

  for (let i = 0; i < 16; i++) {
    if (grid[i] != testGrid[i]) {
      return testGrid;
    }
  }

  return false;
}

export function checkLeft(grid) {
  let tempGrid = [];
  let testGrid = tempGrid.concat(grid);

  shiftLeft(testGrid);
  combineRow(testGrid, 1);
  shiftLeft(testGrid);

  for (let i = 0; i < 16; i++) {
    if (grid[i] !== testGrid[i]) {
      return testGrid;
    }
  }

  return false;
}

export function checkUp(grid) {
  let tempGrid = [];
  let testGrid = tempGrid.concat(grid);

  shiftUp(testGrid);
  combineColumn(testGrid, 1);
  shiftUp(testGrid);

  for (let i = 0; i < 16; i++) {
    if (grid[i] != testGrid[i]) {
      return testGrid;
    }
  }

  return false;
}

export function checkDown(grid) {
  let tempGrid = [];
  let testGrid = tempGrid.concat(grid);

  shiftDown(testGrid);
  combineColumn(testGrid, 2);
  shiftDown(testGrid);

  for (let i = 0; i < 16; i++) {
    if (grid[i] != testGrid[i]) {
      return testGrid;
    }
  }

  return false;
}
