import {useState} from 'react'

const AddTask = ({ onAdd }) => {

    const [text,settext] = useState('')
    const[day,setday] = useState('')
    const [remider, setrem] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!text){
            alert('Please Add a Task')
            return
        }

        const id = Math.floor(Math.random() * 10000) + 1;

        onAdd({ id,text, day, remider})

        settext('')
        setday('')
        setrem(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>

        <div className='form-control'>    
            <label>Task</label>
            <input 
            type='text' 
            placeholder="Add Task" 
            value={text} 
            onChange={(e) => settext(e.target.value)}
            />
            </div>
            
        <div className='form-control'>
            <label>Day & Time</label>
                <input type="text" placeholder="Add Day & Time" value={day} onChange={(e) => setday(e.target.value)} />
            </div>

            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type="checkbox" checked={remider} value={remider} onChange={(e) => setrem(e.currentTarget.checked)} />
            </div>
            <input type="submit" value='Save Task' className="btn btn-block"/>
        </form>
    )
}

export default AddTask
