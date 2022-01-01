import Button from "./button";
import { useLocation } from 'react-router-dom';

const Hader = ({title,onAdd,showAdd}) => {

    const location = useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>

            {location.pathname === '/' && (
            <Button color='green' text={showAdd ? 'close':'Add' } 
            onClick={onAdd}/>
            )}
            
        </header>
    );
}

export default Hader;
