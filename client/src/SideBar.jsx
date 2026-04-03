import Icon from './Icon';

function SideBar(){
    return (
        <aside style={{
            width : '200px',
            color : 'white',
            backgroundColor : '#333',
            borderRightStyle : 'solid',
            borderRightWidth : '1px',
            borderColor : '#1c718d',
        }}>

            <nav style={{marginTop : '20px'}}> 
                <ul style={{margin : 0, padding : 0, listStyleType : 'none'}}> 
                <Icon name={"stats"} width={'auto'} height={'auto'} text={'Statistics'}/>
                <Icon name={"swords"} width={'auto'} height={'auto'} text={'PvP'}/>
                </ul>
            </nav> 
        </aside>
    );
}

export default SideBar;