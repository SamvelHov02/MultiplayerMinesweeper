import { useState, useEffect } from 'react';
import { timeToString } from './utils/other.js';
import './Timer.css';

function Timer({running}){
  const [seconds, setSeconds] = useState(0);
  
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
