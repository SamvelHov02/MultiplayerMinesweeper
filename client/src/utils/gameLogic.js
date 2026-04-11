// initilizes a game based on the inputs
export function placeMines(board, numMines, startRow, startCol){
  let rows = board.length;
  let cols  =board[0].length;

  // Generate the Mines 
  while (numMines > 0){
    let row = Math.floor(Math.random() * rows);
    let col = Math.floor(Math.random() * cols);

    if (!board[row][col].hasMine && (row !== startRow && col !== startCol)){
      board[row][col].hasMine = true;
      numMines--;

      // Update adjacent cells
      for (let rowDir = -1; rowDir < 2; rowDir++){
        for (let colDir = -1; colDir < 2; colDir++){
          let neigRow = row + rowDir;
          let neigCol = col + colDir;
          
          if (inBounds(neigRow, neigCol, rows, cols)){
            board[neigRow][neigCol].neighborMines++;
          }
        }
      }
    }
  }
  return board;
}


// Function called after a left click event
export function revealCell(row, col, board){
  let cell = board[row][col];
  
  if (cell.isFlagged || cell.isRevealed){
    return board;
  }
  
  const newboard = structuredClone(board);
  let cellToMutate = newboard[row][col];
  
  cellToMutate.isRevealed = true;
  // If the cell is 0 need to find the "border"
  if (cellToMutate.neighborMines == 0){
    let cellsToReveal = bfs(row, col, newboard); 
    
    cellsToReveal.forEach(cell => {
      let revRow = cell.row;
      let revCol = cell.col;

      newboard[revRow][revCol].isRevealed = true;
    });
  }
  return newboard;
}


// Returns a boolean for whether a cordinate is within bounds
function inBounds(row, col, rows, cols){
  let rowBool = row < rows && row >= 0;
  let colBool = col < cols && col >= 0;
  return rowBool && colBool;
}


// BFS search for "open seas"
function bfs(row, col, board){
  let rows = board.length;
  let cols = board[0].length;

  let toReveal = [];
  let queue = [];
  queue.push({
    "row" : row,
    "col" : col,
  });

  // Keep track of visited cells
  let visited = new Set();
  visited.add(`${row},${col}`);


  while (queue.length > 0){
    let baseCords = queue.shift();
    toReveal.push(baseCords);

    let baseRow = baseCords.row;
    let baseCol = baseCords.col;
    let baseCell = board[baseRow][baseCol];
    
    if (baseCell.neighborMines === 0){
      // Add adjacent cells 
      for (let rowDir = -1; rowDir < 2; rowDir++){
        for (let colDir = -1; colDir < 2; colDir++){
          let neigRow = baseRow + rowDir;
          let neigCol = baseCol + colDir;
          let cellKey = `${neigRow},${neigCol}`;

          if (
            inBounds(neigRow, neigCol, rows, cols) && 
            !visited.has(cellKey) &&
            !board[neigRow][neigCol].isFlagged && 
            !board[neigRow][neigCol].isRevealed
          ){
            visited.add(`${neigRow},${neigCol}`);

            queue.push({
              "row" : neigRow,
              "col" : neigCol
            });
          }
        }
      }
    }
  }
  return toReveal;
}

export function toggleFlag(board, row, col){
  const newboard = [...board];
  newboard[row] = [...board[row]];
  newboard[row][col] ={
    ...board[row][col], 
    isFlagged : !board[row][col].isFlagged
  };
  return newboard;
}

export function leftClickCell(board, row, col){
  let cell = board[row][col];
  if (!cell.isRevealed){
    const newboard = [...board];
    newboard[row] = [...board[row]];
    newboard[row][col] = {
      ...board[row][col], 
      isRevealed : true
    }
    return newboard;
  }
  return board;
}