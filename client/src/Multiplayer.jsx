import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';
import './Multiplayer.css';
import Icon from './Icon';

function MultiPlayer() {
  return (
    <div style={{display : 'flex', flexDirection : 'column', minHeight : '100vh'}}> 
      <Header />

      <div style={{display : 'flex', flex : 1, flexDirection : 'row', minHeight : '88vh'}}> 
        <SideBar />

        <div id='main-container'>
          <div id='difficulty-title'>
           Select Play Mode! 
          </div>
          <main className="main-board-multiplayer">
            <div className='coop'>
                <Icon name='coop' width='5cqw' height='5cqw' text=''/>
                <span>COOP</span>
            </div> 
            <div className='pvp'>
                <Icon name='swords' width='5cqw' height='5cqw' text=''/>
                <span>PvP</span>
            </div> 
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MultiPlayer;