import { MINE_CONFIG } from './utils/constants';
import { useState } from 'react';
import { placeMines, revealCell, gameStatus, revealAllMines, flagAllMines } from './utils/gameLogic';
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
    let finished = gameState === 'defeat' || gameState === 'victory';
    if (currBoard[row][col].isFlagged || finished){
      return;
    }

    let boardToPlay = currBoard;
    
    if (gameState === 'idle'){
      setState("in-progress");
      boardToPlay = placeMines(currBoard, currentSettings.mines, row, col);
    }

    const newboard = revealCell(row, col, boardToPlay);
    setCurrBoard(newboard);
    
    let status = gameStatus(newboard, MINE_CONFIG[level].mines)
    if (status === 'defeat' || boardToPlay[row][col].hasMine){
      const revealedMines = revealAllMines(boardToPlay);
      setCurrBoard(revealedMines);
      setState('defeat');
      return;
    } else if (status === 'victory'){
      const allMinesFlagged = flagAllMines(newboard);
      setState('victory');
      setCounter(currentSettings.mines);
      setCurrBoard(allMinesFlagged);
    }
  }

  const handleRightClick = (e, row, col) => {
    e.preventDefault();

    let finished = gameState === 'defeat' || gameState === 'victory';
    if (currBoard[row][col].isRevealed || finished) return;

    console.log(`Doesn't disable in state ${gameState}`);

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
    <div 
    className="minesweeper-board"
    onContextMenu={(e) => e.preventDefault()}> 
      {currBoard.map((row, rowIndex) => 
        <div key={rowIndex} className="board-row" style={{display: 'flex'}}>
          {row.map((cellData, colIndex) => 
            <Cell 
              key={`${rowIndex}-${colIndex}`}
              cellData={cellData} 
              onClick={()=> handleLeftClick(rowIndex, colIndex)}
              onRightClick={(e) => handleRightClick(e, rowIndex, colIndex)}
              gameState={gameState}
              />
          )}
        </div>
      )}
    </div>
  );
}

export default Board;