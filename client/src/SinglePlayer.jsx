import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';
import './Singleplayer.css';
import Icon from './Icon';

function SinglePlayer() {
  return (
    <div style={{display : 'flex', flexDirection : 'column', minHeight : '100vh'}}> 
      <Header />

      <div style={{display : 'flex', flex : 1, flexDirection : 'row', minHeight : '88vh'}}> 
        <SideBar />

        <div id='main-container'>
          <div id='difficulty-title'>
            Select Difficulty
          </div>
          <main className="main-board">
            <div className='difficulty-selection' >
              <div className='difficulty-beginner'> 
                <p id='beginner'>Beginner</p>
                <p className='diff-description'>Easy</p>
                <p className='grid-size'>Grid Size : 10x10</p>
                <p className='mines-total'>10 Mines</p>
              </div>
              <div className='difficulty-standard'> 
                <p id='standard'>Intermediate</p>
                <p className='diff-description'>Normal</p>
                <p className='grid-size'>Grid Size : 16x16</p>
                <p className='mines-total'>40 Mines</p>
              </div>
              <div className='difficulty-expert'> 
                <p id='expert'>Expert</p>
                <p className='diff-description'>Hard</p>
                <p className='grid-size'>Grid Size : 16x30</p>
                <p className='mines-total'>99 Mines</p>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SinglePlayer;
