
//Swipe right
function shiftRight(grid)
{
  for (let i = 0; i < 16; i++)
  {
    if(i % 4 == 0)
    {
      let totalOne = grid[i]
      let totalTwo = grid[i + 1]
      let totalThree = grid[i + 2]
      let totalFour = grid[i + 3]
      let row = [totalOne, totalTwo, totalThree, totalFour]

      let filteredRow = row.filter(num => num)
      let missing = 4 - filteredRow.length
      let zeroes = Array(missing).fill(0)
      let newRow = zeroes.concat(filteredRow)

      grid[i] = newRow[0]
      grid[i + 1] = newRow[1]
      grid[i + 2] = newRow[2]
      grid[i + 3] = newRow[3]
    }
  }
}

//Swipe left
function shiftLeft(grid)
{
  for (let i = 0; i < 16; i++)
  {
    if(i % 4 == 0)
    {
      let totalOne = grid[i]
      let totalTwo = grid[i + 1]
      let totalThree = grid[i + 2]
      let totalFour = grid[i + 3]
      let row = [totalOne, totalTwo, totalThree, totalFour]

      let filteredRow = row.filter(num => num)
      let missing = 4 - filteredRow.length
      let zeroes = Array(missing).fill(0)
      let newRow = filteredRow.concat(zeroes)

      grid[i] = newRow[0]
      grid[i + 1] = newRow[1]
      grid[i + 2] = newRow[2]
      grid[i + 3] = newRow[3]
    }
  }
}

function combineRow(grid)
{
  for (let i = 0; i < 15; i++)
  {
    if (i != 3 && i != 7 && i != 11)
    {
      if (grid[i] == grid[i + 1])
      {
        let combinedTotal = grid[i] + grid[i + 1]
        grid[i] = combinedTotal
        grid[i + 1] = 0
      }
    }
  }
}

//Swipe down
function shiftDown(grid)
{
  for (let i = 0; i < 4; i++)
  {
    let totalOne = grid[i]
    let totalTwo = grid[i + 4]
    let totalThree = grid[i + 8]
    let totalFour = grid[i + 12]
    let column = [totalOne, totalTwo, totalThree, totalFour]

    let filteredColumn = column.filter(num => num)
    let missing = 4 - filteredColumn.length
    let zeroes = Array(missing).fill(0)
    let newColumn = zeroes.concat(filteredColumn)

    grid[i] = newColumn[0]
    grid[i + 4] = newColumn[1]
    grid[i + 8] = newColumn[2]
    grid[i + 12] = newColumn[3]
  }
}

//Swipe up
function shiftUp(grid)
{
  for (let i = 0; i < 4; i++)
  {
    let totalOne = grid[i]
    let totalTwo = grid[i + 4]
    let totalThree = grid[i + 8]
    let totalFour = grid[i + 12]
    let column = [totalOne, totalTwo, totalThree, totalFour]

    let filteredColumn = column.filter(num => num)
    let missing = 4 - filteredColumn.length
    let zeroes = Array(missing).fill(0)
    let newColumn = filteredColumn.concat(zeroes)

    grid[i] = newColumn[0]
    grid[i + 4] = newColumn[1]
    grid[i + 8] = newColumn[2]
    grid[i + 12] = newColumn[3]
  }
}

function combineCol(grid)
{
  function combineRow(grid)
  {
    for (let i = 0; i < 12; i++)
    {
      if (grid[i] == grid[i + 4])
      {
        let combinedTotal = grid[i] + grid[i + 4]
        grid[i] = combinedTotal
        grid[i + 4] = 0
      }
    }
  }
}
