import Icon from './Icon';

function Cell({ cellData, onRightClick, isChordPressed, onMouseUp, onMouseDown, onMouseEnter, onMouseLeave, gameState }) {

  const isNumber = cellData.isRevealed && cellData.neighborMines > 0 && !cellData.hasMine;

  const className = `minesweeper-cell 
    ${cellData.isRevealed ? 'revealed' : ''}
    ${isNumber ? `type_${cellData.neighborMines}` : ''}
    ${cellData.isRevealed && cellData.hasMine ? 'mine' : ''}
    ${cellData.isFlagged ? 'flag' : ''}
    ${cellData.isFlagged && !cellData.hasMine && gameState === 'defeat' ? 'incorrect' : ''}
    ${isChordPressed ? 'pressed' : ''}`;
  

  return (
   <div 
    className={className}
    // onClick={onClick}
    onContextMenu={onRightClick}
    onMouseUp={onMouseUp}
    onMouseDown={onMouseDown}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    >
      {isNumber && cellData.neighborMines}
      {cellData.isFlagged && <Icon name='flag' width='auto' height='auto' text=''/> }
      {cellData.hasMine && cellData.isRevealed && <Icon name='bomb' width='auto' height='auto' text=''/> }
   </div>
  );
}

export default Cell;
