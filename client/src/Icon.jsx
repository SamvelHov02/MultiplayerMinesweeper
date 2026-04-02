import { Icons } from './assets';

function Icon({name}){
  console.log(Icons);
  return (
  <div className={name}>
      <img src={Icons[name]} alt={name} />
  </div>
  );
}

export default Icon;
