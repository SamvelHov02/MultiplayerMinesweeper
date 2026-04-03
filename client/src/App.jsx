import Board from './Board';
import Menu from './Menu';
import GameHeader from './GameHeader';
import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';
import Icon from './Icon';

function App() {
  return (
    <div style={{display : 'flex', flexDirection : 'column', minHeight : '100vh'}}> 
      <Header />

      <div style={{display : 'flex', flex : 1, flexDirection : 'row', minHeight : '88vh'}}> 
        <SideBar />

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
            <GameHeader /> 
            <Board rows={10} cols={10}/> 
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
