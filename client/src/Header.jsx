import Timer from './Timer';
import Counter from './Counter';

function Header() {
  return (
    <div className="minesweeper-header" style={{
      display : 'flex',
      justifyContent : 'space-evenly',
      width : '100%',
    }}>
      <Timer /> 
      <Counter />
    </div>
  );
}

export default Header;
