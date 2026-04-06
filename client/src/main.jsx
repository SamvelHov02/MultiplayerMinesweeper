import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './Home.jsx'
import SinglePlayer from './SinglePlayer.jsx'
import Game from './Game.jsx';
import MultiPlayer  from './Multiplayer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Home /> */}
    {/* <SinglePlayer/> */}
    {/* <Game level={'hard'}/> */}
    <MultiPlayer />
    {/* <App /> */}
  </StrictMode>,
)
