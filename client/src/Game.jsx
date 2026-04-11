import  { MINE_CONFIG } from './utils/constants';
import { useState } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';
import Timer from './Timer';
import Counter from './Counter';
import Board from './Board';
import './Game.css'
import './Cell.css'
import Icon from './Icon';

function Game({ initLevel }) {
    const [level, setLevel] = useState(initLevel);
    // The game state is either : idle, in-progress, won or lost
    const [gameState, setGameState] = useState('idle');
    const [mineCounter, setMineCounter] = useState(0);
    const currentSettings = MINE_CONFIG[level];

    const switchDifficulty = (newLevel) => {
        setLevel(newLevel);
        setGameState('idle');
    }

    return (
        <div style={{display : 'flex', flexDirection : 'column', minHeight : '100vh'}}> 
            <Header />
            <div style={{display : 'flex', flex : 1, flexDirection : 'row', minHeight : '88vh'}}> 
            <SideBar />

            <div id='main-container'>
                <main className="main-board-game">
                <div className='main-board-header'>
                    <Timer running={gameState === 'in-progress'}/>
                    <Counter totalMines={currentSettings.mines} flagsPlaced={mineCounter} />
                </div>
                <div className='board-area'>
                    <div className='board-wrapper'> 
                        <Board key={level} level={level} gameState={gameState} setState={setGameState} counter={mineCounter} setCounter={setMineCounter}/>
                    </div>
                    <div className='difficulty-menu'>
                        <span onClick={() =>switchDifficulty('easy')}>Easy 10x10</span>
                        <span onClick={() =>switchDifficulty('normal')}>Normal 16x16</span>
                        <span onClick={() => switchDifficulty('hard')}>Hard 16x30</span>
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
