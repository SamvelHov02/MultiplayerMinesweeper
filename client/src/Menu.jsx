// Menu Component for the Difficulty Options
function Menu() {
  return (
    <div className="difficulty-menu" style={{
      display: 'flex',
      flexDirection : 'row',
      justifyContent : 'space-evenly',
      width : '100%',
      marginBottom: '50px'
    }}>
      <div className="difficulty-easy" style={{
        backgroundColor : '#fff'
      }}>EASY</div>
      <div className="difficulty-medium" style={{
        backgroundColor : '#fff'
      }}>MEDIUM</div>
      <div className="difficulty-hard" style={{
        backgroundColor : '#fff'
      }}>HARD</div>
    </div>
  ); 
}

export default Menu;
