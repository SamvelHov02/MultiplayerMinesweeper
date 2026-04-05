import { Icons } from './assets';
import Icon from './Icon';

function Header(){
  console.log(Icons["cog"]);
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
      maxHeight : '5vh',
      justifyContent : 'space-between'
    }}>

      <div className="header-title" style={{display : 'flex', flexDirection : 'row'}}>
        <h1>Multiplayer</h1>
        <h1 style={{color : '#1c718d', marginLeft : '25px'}}>Minesweeper</h1>
      </div>

      <div className="header-settings" style={{marginTop : '32px',  marginRight : '32px'}}>
        <Icon name={"settings"} width={'auto'} height={'auto'} text={''} /> 
        <Icon name={"account"} width={'auto'} height={'auto'} text={''} /> 
      </div>
    </header>
  ); 
}

export default Header;
