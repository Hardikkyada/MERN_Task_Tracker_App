import { FaTimes } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';


const Task = ({ task, onDelete, onUpdate, onToggle}) => {
    return (
        <div className={`task ${task.remider ? 'remider':''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.text }{' '} <FaTimes style={{color:'red',cursor:'pointer'}}
            onClick={()=>onDelete(task.id)} 
           /></h3>
           {/*<p>{task.day}</p>*/}
            <p>{task.day}{' '} <AiFillEdit style={{ color: 'green', cursor: 'pointer' }}
                onClick={() => onUpdate(task.id)}
    /></p>

        </div>
    )
}

export default Task
