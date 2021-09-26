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
        if (direction == 1)
        {
          grid[i] = combinedTotal;
          grid[i + 1] = 0;
        }
        if (direction == 2)
        {
          grid[i] = 0;
          grid[i + 1] = combinedTotal;
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
      if (direction == 1)
      {
        grid[i] = combinedTotal;
        grid[i + 4] = 0;
      }
      if (direction == 2)
      {
        grid[i] = 0;
        grid[i + 4] = combinedTotal;
      }
    }
  }
}

//Checks if moves are still available
export function movesLeft(grid) {
  if (checkRight(grid) || checkLeft(grid) || checkUp(grid) || checkDown(grid)) {
    return true;
  }
  return false;
}

export function checkRight(grid) {
  let tempGrid = [];
  let testGrid = tempGrid.concat(grid);

  shiftRight(testGrid);
  combineRow(testGrid);
  shiftRight(testGrid);

  for (let i = 0; i < 15; i++) {
    if (grid[i] != testGrid[i]) {
      return true;
    }
  }

  return false;
}

export function checkLeft(grid) {
  let tempGrid = [];
  let testGrid = tempGrid.concat(grid);

  shiftLeft(testGrid);
  combineRow(testGrid);
  shiftLeft(testGrid);

  for (let i = 0; i < 15; i++) {
    if (grid[i] != testGrid[i]) {
      return true;
    }
  }

  return false;
}

export function checkUp(grid) {
  let tempGrid = [];
  let testGrid = tempGrid.concat(grid);

  shiftUp(testGrid);
  combineColumn(testGrid);
  shiftUp(testGrid);

  for (let i = 0; i < 15; i++) {
    if (grid[i] != testGrid[i]) {
      return true;
    }
  }

  return false;
}

export function checkDown(grid) {
  let tempGrid = [];
  let testGrid = tempGrid.concat(grid);

  shiftDown(testGrid);
  combineColumn(testGrid);
  shiftDown(testGrid);

  for (let i = 0; i < 15; i++) {
    if (grid[i] != testGrid[i]) {
      return true;
    }
  }

  return false;
}
