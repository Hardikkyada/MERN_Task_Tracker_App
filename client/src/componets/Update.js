import { useState } from 'react'

const Update = ({ userdata,updata }) => {
    
    const [text, settext] = useState(userdata.text)
    const [day, setday] = useState(userdata.day)

    const onSubmit = (e) => {
        e.preventDefault()

        if (!text) {
            alert('Please Add a Task')
            return
        }

        const id = userdata.id;

        updata(id,{text, day });

        settext('')
        setday('')
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

            <input type="submit" value='Update Task' className="btn btn-block" />
        </form>
    )
}

export default Update
