import { MINE_CONFIG } from './utils/constants';
import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';
import Timer from './Timer';
import Board from './Board';
import './Pvp.css';
import Icon from './Icon';

function Pvp() {
    const currentSettings = MINE_CONFIG["pvp"]
    return (
        <div style={{display : 'flex', flexDirection : 'column', minHeight : '100vh'}}> 
            <Header />

            <div style={{display : 'flex', flex : 1, flexDirection : 'row', minHeight : '88vh'}}> 
            <SideBar />

            <div id='main-container'>
                <main className='main-board-pvp'>
                <div className='head-to-head stats'>
                    <div className='your-stats'> 
                        <span style={{color : '#00DAF2'}}>you</span>
                        <span><span className='progress-percentage' style={{color : 'white'}}>0%</span><span>cleared</span></span>
                        <span>progress-bar</span>
                    </div> 
                    <Timer running={false}/>
                    <div className='opponent-stats'>
                        <span style={{color : '#E03500'}}>Opponent</span>
                        <span><span>cleared</span><span className='progress-percentage' style={{color :'white'}}>0%</span></span>
                        <span>progress-bar</span>
                    </div> 
                </div>
                <div className='pvp-boards'>
                    <div className='own-board-wrapper'>
                        <Board rows={24} cols={16}/> 
                    </div>
                    <div className='opponent-board-wrapper'>
                        <Board rows={24} cols={16}/>
                    </div>
                </div>
                </main>
            </div>
            </div>

            <Footer />
        </div>
        );
}

export default Pvp;