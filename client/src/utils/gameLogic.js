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
  
  if (cell.isFlagged){
    return board;
  } else if (cell.isRevealed){
    return revealAdjacentCells(board, row, col);
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

export function gameWon(board, totalMines){
  let rows = board.length;
  let cols = board[0].length;
  let hiddenCells = 0;

  for (let r = 0; r < rows ; r++){
    for (let c = 0; c < cols; c++){
      if (!board[r][c].isRevealed){
        hiddenCells++;
      }
    }
  }
  return hiddenCells === totalMines;
}

// When player clicks on a mine cells all other mines should also be revealed
export function revealAllMines(board){
  const newboard = structuredClone(board);
  
  for (let r = 0; r < newboard.length; r++){
    for (let c = 0; c < newboard[r].length; c++){
      if (newboard[r][c].hasMine && !newboard[r][c].isFlagged){
        newboard[r][c].isRevealed = true;
      }
    }
  }
  return newboard;
}

// When player wins all mines should come up as flagged
export function flagAllMines(board){
  const newboard = structuredClone(board);
  
  for (let r = 0; r < newboard.length; r++){
    for (let c = 0; c < newboard[r].length; c++){
      if (newboard[r][c].hasMine && !newboard[r][c].isFlagged){
        newboard[r][c].isFlagged= true;
      }
    }
  }
  return newboard;
}

// Reveals the remaining adjacent cells to the cell at row, col 
export function revealAdjacentCells(board, row, col) {
  const cell = board[row][col]; // Read-only access
  let totalFlags = 0;

  // 1. Count flags around the cell
  for (let rowDir = -1; rowDir < 2; rowDir++) {
    for (let colDir = -1; colDir < 2; colDir++) {
      const neigRow = row + rowDir;
      const neigCol = col + colDir;

      // Check bounds and skip the center cell
      if (inBounds(neigRow, neigCol, board.length, board[0].length) && (neigRow !== row || neigCol !== col)) {
        if (board[neigRow][neigCol].isFlagged) {
          totalFlags++;
        }
      }
    }
  }

  if (totalFlags === cell.neighborMines) {
    let updatedBoard = structuredClone(board);

    for (let rowDir = -1; rowDir < 2; rowDir++) {
      for (let colDir = -1; colDir < 2; colDir++) {
        const neigRow = row + rowDir;
        const neigCol = col + colDir;

        if (inBounds(neigRow, neigCol, board.length, board[0].length) && (neigRow !== row || neigCol !== col)) {
          const neighbor = updatedBoard[neigRow][neigCol];
          
          if (!neighbor.isRevealed && !neighbor.isFlagged) {
            updatedBoard = revealCell(neigRow, neigCol, updatedBoard);
          }
        }
      }
    }
    return updatedBoard; 
  }

  return board; 
}

// Returns a string for the current state of the game
// either, in-progress or it has ended in victory or defeat 
export function gameStatus(board, totalMines){
  
  let rows = board.length;
  let cols = board[0].length;
  
  // Check for a win or lose condition 
  let hiddenCells = 0;

  for (let r = 0; r < rows ; r++){
    for (let c = 0; c < cols; c++){
      if (!board[r][c].isRevealed){
        hiddenCells++;
      } else if (board[r][c].hasMine){
        return 'defeat';
      }
    }
  }

  let win = hiddenCells === totalMines;
  return win ? 'victory' : 'in-progress';
}