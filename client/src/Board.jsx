import { MINE_CONFIG } from './utils/constants';
import { useState } from 'react';
import { placeMines, revealCell } from './utils/gameLogic';
import Cell from './Cell';

const createEmptyBoard = (rows, cols) => {
  return Array.from({length : rows}, () => 
    Array.from({length : cols}, () => ({
      hasMine : false,
      isRevealed : false,
      isFlagged : false,
      neighborMines : 0
    }))
  );
};

function Board({ level, gameState, setState, counter, setCounter}) {
  const currentSettings = MINE_CONFIG[level];
  const [currBoard, setCurrBoard] = useState(() => createEmptyBoard(currentSettings.rows, currentSettings.cols))


  const handleLeftClick = (row, col) => {
    // console.log(`${row}, ${col} was clicked`);
    if (currBoard[row][col].isRevealed || currBoard[row][col].isFlagged){
      return;
    }

    let boardToPlay = currBoard;
    
    if (gameState === 'idle'){
      setState("in-progress");
      boardToPlay = placeMines(currBoard, currentSettings.mines, row, col);
    }

    const newboard = revealCell(row, col, boardToPlay);
    setCurrBoard(newboard);
  }

  const handleRightClick = (e, row, col) => {
    e.preventDefault();

    if (currBoard[row][col].isRevealed) return;

    const newboard = [...currBoard];
    newboard[row] = [...newboard[row]];
    newboard[row][col] = {
      ...newboard[row][col],
      isFlagged : !newboard[row][col].isFlagged
    };

    setCurrBoard(newboard);
    // Need to update the flag counter, increment if new flag otherwise decrease
    let newCounter = 0;
    if (newboard[row][col].isFlagged){
      newCounter = counter + 1;
    } else {
      newCounter = counter - 1;
    }
    setCounter(newCounter);
  }


  return (
    <div className="minesweeper-board"> 
      {currBoard.map((row, rowIndex) => 
        <div key={rowIndex} className="board-row" style={{display: 'flex'}}>
          {row.map((cellData, colIndex) => 
            <Cell 
              key={`${rowIndex}-${colIndex}`}
              cellData={cellData} 
              onClick={()=> handleLeftClick(rowIndex, colIndex)}
              onRightClick={(e) => handleRightClick(e, rowIndex, colIndex)}/>
          )}
        </div>
      )}
    </div>
  );
}

export default Board;