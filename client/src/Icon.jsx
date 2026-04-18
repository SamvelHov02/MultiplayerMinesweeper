import { Icons } from './assets';

function Icon({name, width, height, text}){
  if (text.length == 0)
    return (
      <img src={Icons[name]} alt={name} style={{maxHeight : '100%', width : width, height : height,  objectFit : 'contain'  }}/>
    );

  return (
    <div style={{display : 'flex', paddingTop : '15px', paddingBottom : '15px',  paddingLeft : '15px'}}>
      <img src={Icons[name]} alt={name} style={{maxHeight : '100%', width : width, height : height, objectFit : 'contain', marginRight :'15px'}}/>
      {text}
    </div>
  );
}

export default Icon;
