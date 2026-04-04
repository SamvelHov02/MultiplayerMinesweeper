function Footer(){
    return (
      <footer style={{backgroundColor : '#1F1E1F', borderTopStyle : 'solid', borderTopWidth : '2px', display:'flex', alignItems : 'right', justifyContent: 'right', flex : 1, borderColor : '#1c718d' }}>  
        <a href='./privacy'>Privacy</a>
        <a href='./support' style={{marginRight : '20px', marginLeft : '20px'}}>Support</a>
      </footer>
    );
}

export default Footer;
