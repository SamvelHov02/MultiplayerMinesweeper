import Cell from './Cell';

function Board({rows, cols}) {
  // Generate the cell array 
  const grid = Array.from({length: rows}, () => 
    Array.from({length:cols}, () => null)
  );

  return (
    <div className="minesweeper-board" style={{border : '20px solid #121212', borderRadius : '10px'}}>
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
