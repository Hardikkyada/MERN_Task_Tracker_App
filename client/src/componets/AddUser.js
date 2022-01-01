import axios from 'axios'
import {useState} from 'react'

export const AddUser = () => {

    const [name,setname] = useState('')
    const [password, setpass] = useState('')
    const [email, setemail] = useState('')
    const [age, setage] = useState('')



    const user = 
    { 
        name:name,
        password:password,
        email:email,
        age:age 
    }

    
    const onSubmit = async (e) => {
        e.preventDefault()

        if (!name && !email && !password && !age) {
            alert('Please Fill All Detailes')
            return
        }

        /*const res = await fetch("/api/registration",{
            method:"POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })

        
        const data = await res.json()*/

        axios.post("/api/reg",user).then((res)=> console.log(res.data));

        setemail('')
        setpass('')
        setname('')
        setage('')
    }



    return (
        
        <form className='add-form' onSubmit={onSubmit}>
                    <div className='form-control'>
                <input type='text' className='form-control'
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                />
            </div>
                    <div className='form-control'>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)} />
            </div>

            <div className='form-control'>
                <input type="text"  id="age" placeholder="Age" value={age} onChange={(e) => setage(e.target.value)} />
            </div>

            <div className='form-control'>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setpass(e.target.value)} />
            </div>

            <input type="submit" value='Add User' className="btn btn-primary" />
            
        </form>
    )
}
