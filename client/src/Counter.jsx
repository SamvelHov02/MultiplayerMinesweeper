import './Counter.css';

function Counter({totalMines, flagsPlaced}) {
  return (
    <div className="minesweeper-counter">
      <span>{flagsPlaced}/{totalMines}</span>
    </div>
  );
}

export default Counter;
