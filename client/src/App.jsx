import Board from './Board';
import Menu from './Menu';
import Header from './Header';

function App() {
  return (
    <div style={{display : 'flex', flexDirection : 'column', minHeight : '100vh'}}> 
      <header style={{backgroundColor : '#1F1E1F', paddingTop : '15px', paddingBottom : '25px', 
        borderTopWidth: '2px',
        borderBottomWidth: '2px',
        borderColor : 'white',
        borderTopStyle : 'solid',
        borderBottomStyle : 'solid',
      }}>
        <h1>Multiplayer Minesweeper</h1>
      </header>

      <div style={{display : 'flex', flex : 1, flexDirection : 'row', minHeight : '90vh'}}> 
        <div style={{width : '200px', color : 'white', backgroundColor : '#333', borderRightStyle : 'solid', borderRightWidth : '1px', minHeight : '90vh'}}>
          <aside >
            <nav> 
              <ul style={{margin : 0, padding : 0, listStyleType : 'none'}}> 
                <li>Home</li>
                <li>Leaderboard</li>
                <li>Multiplayer</li>
                <p>Test</p>
              </ul>
            </nav> 
          </aside>
        </div>

        <div style={{
          display: 'flex',
          flex : 1,
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily : 'sans-serif',
          marginTop : '50px',
        }}>

          <main className="main-board" style={{
            display : 'flex',
            flexDirection : 'column',
            alignItems : 'center',
            justifyContent : 'center'
          }}>
            <Menu />
            <Header /> 
            <Board rows={10} cols={10}/> 
          </main>
        </div>
      </div>

      <footer style={{backgroundColor : '#1F1E1F', borderTopStyle : 'solid', borderTopWidth : '2px', display:'flex', alignItems : 'right', justifyContent: 'right', flex : 1 }}> 
        <a href='./privacy'>Privacy</a>
        <a href='./support' style={{marginRight : '20px', marginLeft : '20px'}}>Support</a>
      </footer>
    </div>
  );
}

export default App;
