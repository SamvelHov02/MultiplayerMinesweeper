// initilizes a game based on the inputs
export function initGame(rows, cols, numMines){
  // Create the cells 
  let board = [];
  for (let r  = 0; r < rows; r++){
    let row = [];
    for (let c = 0; c < cols; c++){
      row.push({
        row : r,
        col : c,
        hasMine : false,
        isRevealed : false, 
        isFlagged : false,
        neighborMines : 0
      });
    }
    board.push(row);
  }

  // Generate the Mines 
  while (numMines > 0){
    let row = Math.floor(Math.random() * rows);
    let col = Math.floor(Math.random() * cols);

    if (!board[row][col].hasMine){
      board[row][col].hasMine = True;
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

  if (board[row][col].isFlagged || board[row][col].isRevealed){
    return board;
  }
  
  board[row][col].isRevealed = True;

  // If the cell is 0 need to find the "border"
  if (board[row][col].neighborMines == 0){
    let cellsToReveal = bfs(row, col, board); 
    
    cellsToReveal.forEach(cell => {
      let revRow = cell.row;
      let revCol = cell.col;

      board[revRow][revCol].isRevealed = True;
    });
  }
}


// Returns a boolean for whether a cordinate is within bounds
function inBounds(row, col, rows, cols){
  let rowBool = row < rows && row > 0;
  let colBool = col < cols && col > 0;
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

  while (queue.length > 0){
    let baseCords = queue.shift();
    toReveal.push(baseCords);

    let baseRow = baseCords.row;
    let baseCol = baseCords.col;
    let baseCell = board[baseRow][baseCol];

    // Add adjacent cells 
    for (let rowDir = -1; rowDir < 2; rowDir++){
      for (let colDir = -1; colDir < 2; colDir++){
        let neigRow = baseRow + rowDir;
        let neigCol = baseCol + colDir;

        if (inBounds(neigRow, neighCol, rows, cols) && board[neigRow][neigCol].neighborMines == 0){
          queue.push({
            "row" : neigRow,
            "col" : neigCol
          });
        }
      }
    }
  }
  return toReveal;
}
