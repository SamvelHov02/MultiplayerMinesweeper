import Icon from './Icon';

function Cell({ cellData, onClick, onRightClick, gameState }) {

  const isNumber = cellData.isRevealed && cellData.neighborMines > 0 && !cellData.hasMine;

  const className = `minesweeper-cell 
    ${cellData.isRevealed ? 'revealed' : ''}
    ${isNumber ? `type_${cellData.neighborMines}` : ''}
    ${cellData.isRevealed && cellData.hasMine ? 'mine' : ''}
    ${cellData.isFlagged ? 'flag' : ''}
    ${cellData.isFlagged && !cellData.hasMine && gameState === 'defeat' ? 'incorrect' : ''}`;
  

  return (
   <div 
    className={className}
    onClick={onClick}
    onContextMenu={onRightClick}
    >
      {isNumber && cellData.neighborMines}
      {cellData.isFlagged && <Icon name='flag' width='auto' height='auto' text=''/> }
      {cellData.hasMine && cellData.isRevealed && <Icon name='bomb' width='auto' height='auto' text=''/> }
   </div>
  );
}

export default Cell;
