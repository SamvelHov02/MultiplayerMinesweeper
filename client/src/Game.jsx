import  { MINE_CONFIG } from './utils/constants';
import { useState, useEffect } from 'react';
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
    const [gameId, setGameId] = useState(0);
    const currentSettings = MINE_CONFIG[level];

    const switchDifficulty = (newLevel) => {
        const targetLevel = newLevel || level; 
        setLevel(targetLevel);
        setGameState('idle');
        setMineCounter(0);
        setGameId(prev => prev + 1);
    }

    useEffect(()=> {
        const handleKeyPress = (e) => {
            if (e.code === 'Space' && gameState !=='idle'){
                e.preventDefault();
                switchDifficulty();
            }
        };

        window.addEventListener('keydown', handleKeyPress)

        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [level, gameId, gameState]);

    return (
        <div style={{display : 'flex', flexDirection : 'column', minHeight : '100vh'}}> 
            <Header />
            <div style={{display : 'flex', flex : 1, flexDirection : 'row', minHeight : '88vh'}}> 
            <SideBar />

            <div id='main-container'>
                <main className="main-board-game">
                <div className='main-board-header'>
                    <Timer running={gameState === 'in-progress'} gameState={gameState}/>
                    <Counter totalMines={currentSettings.mines} flagsPlaced={mineCounter} />
                </div>
                <div className='board-area'>
                    <div className='board-wrapper'> 
                        <Board key={`${level}-${gameId}`} level={level} gameState={gameState} setState={setGameState} counter={mineCounter} setCounter={setMineCounter}/>
                    </div>
                    <div className='difficulty-menu'>
                        <span onClick={() => switchDifficulty('easy')}>Easy 10x10</span>
                        <span onClick={() => switchDifficulty('normal')}>Normal 16x16</span>
                        <span onClick={() => switchDifficulty('hard')}>Hard 16x30</span>
                    </div>
                </div>
                </main>

                {(gameState === 'victory' || gameState === 'defeat') && (
                    <div className='game-over-box'>
                        <h2>{gameState === 'victory' ? "Victory! 😄" : "Defeat 💣"}</h2>
                        <button onClick={() => switchDifficulty()}>Restart Game</button>
                    </div>
                )}
            </div>
            </div>

            <Footer />
        </div>
    );
}

export default Game;