import Cell from './Cell';
import './Cell.css';

function Board({rows, cols}) {
  // Generate the cell array 
  const grid = Array.from({length: rows}, () => 
    Array.from({length:cols}, () => null)
  );

  return (
      <div className="minesweeper-board">  
        {grid.map((row, rowIndex) => 
          <div key={rowIndex} className="board-row" style={{display: 'flex'}}>
            {row.map((_, colIndex) => 
              <Cell key={`${rowIndex}-${colIndex}`}/>
            )}
          </div>
        )}
      </div>
  );
}

export default Board; 
