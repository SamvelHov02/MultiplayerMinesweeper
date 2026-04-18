import { useState, useEffect } from 'react';
import { timeToString } from './utils/other.js';
import './Timer.css';

function Timer({ running, gameState }){
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (gameState === 'idle'){
      setSeconds(0);
    }
  }, [gameState]);
  
  useEffect(() => {
    let interval = null;

    if (running){
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else{
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);


  return (
    <div className="minesweeper-Timer" >
     {timeToString(seconds)}
    </div>
  );
}

export default Timer;
