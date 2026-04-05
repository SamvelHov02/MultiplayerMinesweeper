import  { MINE_CONFIG } from './utils/constants';
import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';
import Timer from './Timer';
import Counter from './Counter';
import Board from './Board';
import './Game.css'
import Icon from './Icon';

function Game({ level }) {
    const currentSettings = MINE_CONFIG[level];
    

    return (
        <div style={{display : 'flex', flexDirection : 'column', minHeight : '100vh'}}> 
            <Header />

            <div style={{display : 'flex', flex : 1, flexDirection : 'row', minHeight : '88vh'}}> 
            <SideBar />

            <div id='main-container'>
                <main className="main-board-game">
                <div className='main-board-header'>
                    <Timer running={true}/>
                    <Counter totalMines={currentSettings.mines} flagsPlaced={0} />
                </div>
                <div className='board-area'>
                    <Board cols={currentSettings.cols} rows={currentSettings.rows}/>
                    <div className='difficulty-menu'>
                        <span>Easy 10x10</span>
                        <span>Normal 16x16</span>
                        <span>Hard 16x30</span>
                    </div>
                </div>
                </main>
            </div>
            </div>

            <Footer />
        </div>
    );
}

export default Game;
