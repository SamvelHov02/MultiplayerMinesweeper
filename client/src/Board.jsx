import { MINE_CONFIG } from './utils/constants';
import { useState } from 'react';
import { placeMines, revealCell, gameStatus, revealAllMines, flagAllMines, revealAdjacentCells, countFlagsAround} from './utils/gameLogic';
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
  const [activeChord, setActiveChord] = useState(null);
  const [activeCell, setActiveCell] = useState(null);


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

  const handleMouseUp = (e, row, col) => {
    console.log("Gets to mouse up handler");
    // Do nothing if not a left click
    if (e.button !== 0) return;

    // Clear pressed visuals, is it needed?
    // setActiveChord(null)
    // setActiveCell(null)

    let finsihed = gameState === 'defeat' || gameState === 'victory';
    if (finsihed) return;

    const cell = currBoard[row][col];

    // Chording 
    if (cell.isRevealed){
      const flagCount = countFlagsAround(currBoard, row, col);
      
      if (flagCount === cell.neighborMines) {
        const newboard = revealAdjacentCells(currBoard, row, col);
        setCurrBoard(newboard);

        let status = gameStatus(newboard, currentSettings.mines);
        if (status === 'defeat'){
          setState('defeat');
          setCurrBoard(revealAllMines(newboard));
        } else if (status === 'victory'){
          setState('victory');
          setCounter(currentSettings.mines);
          setCurrBoard(flagAllMines(newboard));
        }
      }
    }

    else{
      console.log("Gets to single click");
      handleLeftClick(row, col);
    }
  }

  const handleMouseDown = (e, row, col) => {

    if (e.button === 0 && currBoard[row][col].isRevealed){
      setActiveChord({row, col});
    }
    else if (e.button === 0) {
      setActiveCell({row, col});
    }
  }

  const clearVisuals = () => {
    setActiveCell(null);
    setActiveChord(null);
  }

  return (
    <div 
    className="minesweeper-board"
    onContextMenu={(e) => e.preventDefault()}
    onMouseUp={clearVisuals}
    onMouseLeave={clearVisuals}
    onDragStart={(e) => e.preventDefault()}
    > 

      {currBoard.map((row, rowIndex) => 
        <div key={rowIndex} className="board-row" style={{display: 'flex'}}>
          {row.map((cellData, colIndex) => { 
            let isVisuallyPressed = false;
            if (activeChord) {
              const isNeighbor = Math.abs(rowIndex - activeChord.row) <= 1 && Math.abs(colIndex - activeChord.col) <= 1 
              if (isNeighbor && !cellData.isRevealed && !cellData.isFlagged){
                isVisuallyPressed = true;
              }
            } 
            else if (activeCell){
              if (activeCell.row === rowIndex && activeCell.col === colIndex && !cellData.isRevealed && !cellData.isFlagged){
                isVisuallyPressed = true;
              }
            }
            return (
              <Cell 
                key={`${rowIndex}-${colIndex}`}
                cellData={cellData} 
                // onClick={()=> handleLeftClick(rowIndex, colIndex)}
                onMouseUp={(e) => handleMouseUp(e, rowIndex, colIndex)}
                onRightClick={(e) => handleRightClick(e, rowIndex, colIndex)}
                isChordPressed = {isVisuallyPressed}
                onMouseDown={(e) => handleMouseDown(e, rowIndex, colIndex)}
                onMouseEnter={(e) => {
                  if (e.buttons === 1){
                    if (cellData.isRevealed){
                      setActiveChord({row : rowIndex, col : colIndex});
                      setActiveCell(null)
                    } else {
                      setActiveChord(null);
                      setActiveCell({row : rowIndex, col : colIndex})
                    }
                  }
                }}
                onMouseLeave={(e) => {
                  if (e.buttons === 1){
                    setActiveCell(null);
                    setActiveChord(null);
                  }
                }}
                gameState={gameState}
                />
              );
          }
          )}
        </div>
      )}
    </div>
  );
}

export default Board;
