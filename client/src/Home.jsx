import Board from './Board';
import Menu from './Menu';
import GameHeader from './GameHeader';
import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';
import Icon from './Icon';

function Home() {
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

          <div style={{color : '#1c718d', fontSize: '80px', fontFamily : '-moz-initial', marginTop: '5vh', paddingBottom : '25vh'}}>Let's Mine Mine!</div>
          <main className="main-board" style={{
            display : 'flex',
            flexDirection : 'column',
            alignItems : 'center',
            justifyContent : 'space-between',
            height : '100%',
            width : '100%',
          }}>
            {/* Need to create the different  */}
            <div className='mode-selection' style={{display : 'flex', flexDirection : 'row', width : '100%', justifyContent : 'space-evenly'}}>
              <div className='single-mode' style={{width : '25%', height : '150px',  display : 'flex', flexDirection : 'column', backgroundColor : '#1C1B1B', alignItems : 'center', textAlign : 'center', justifyContent : 'center', paddingLeft : '2vh', paddingRight : '2vh', justifyContent : 'space-between', borderRadius: '10px'}}>
                <Icon name={"single"} width={'40%'} height={'40%'} text={''} />
                <span style={{marginBottom : '10px', color : '#006875'}}>Singleplayer</span>
              </div>
              <div className='multi-mode'style={{width : '25%', height : '150px', display : 'flex', flexDirection : 'column', backgroundColor : '#1C1B1B', alignItems : 'center', textAlign : 'center', justifyContent : 'center', paddingLeft : '2vh', paddingRight : '2vh', justifyContent : 'space-between', borderRadius : '10px'}}>
                <Icon name={"multi"} width={'40%'} height={'40%'} text={''} />
                <span style={{marginBottom : '10px', color : '#006875'}}>Multiplayer</span>
              </div>
            </div>
            
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
