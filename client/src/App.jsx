import Board from './Board';
import Menu from './Menu';
import Header from './Header';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily : 'sans-serif',
      marginTop : '50px'
    }}>
      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/leaderboard">Leaderboard</a>
          <a href="/profile">profile</a>
        </nav>
      </header>
      <main className="main-board" style={{
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
      }}>
        <h1>Multiplayer Minesweeper</h1>
        <Menu />
        <Header /> 
        <Board rows={10} cols={10}/> 
      </main>
    </div>
  );
}

export default App;
