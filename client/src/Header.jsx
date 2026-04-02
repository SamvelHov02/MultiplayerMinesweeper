import { Icons } from './assets';
import Icon from './Icon';

function Header(){
  return (
    <header style={{backgroundColor : '#1F1E1F', paddingTop : '15px', paddingBottom : '25px', 
      borderTopWidth: '2px',
      borderBottomWidth: '2px',
      borderColor : 'white',
      borderTopStyle : 'solid',
      borderBottomStyle : 'solid',
      borderColor : '#1c718d',
      display : 'flex',
      alignItems : 'left',
    }}>

      <h1>Multiplayer</h1>
      <h1 style={{color : '#1c718d', marginLeft : '25px'}}>Minesweeper</h1>
      <div className="header-settings">
        <Icon name={"placeholder"}/> 
      </div>
    </header>
  ); 
}

export default Header;
