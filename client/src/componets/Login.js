import axios from 'axios'
import { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";



export const Login = ({ onAdd, setLogin}) => {

    const navigate = useNavigate();
    const [username, setusername] = useState('')
    const [password, setpass] = useState('')

    const user =
    {
        name: username,
        password: password
    }


    const onSubmit = async (e) => {
        e.preventDefault()

        if (!username) {
            alert('Please UserName')
            return
        }

     
        axios.post("/api/login", user)
        .then(res => { setLogin(res.data.data)
            
        if (!res.data.data._id)
        {
            alert("Wornge id And Password")
        }
        });
    

        setusername('')
        setpass('')
    }



    return (
<div>
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>UserName</label>
                    <input
                        type='text'
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                    />
                </div>

                <div className='form-control'>
                    <label>Password</label>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setpass(e.target.value)} />
                </div>
        
            <input type="submit" value='Login' className="btn btn-success" /> 
            {/*<NavLink to="/add"><input type="submit" value='Registration' className="btn btn-primary ms-2" /></NavLink>*/}
            <button type="button" onClick={onAdd}  className="btn btn-primary ms-2">Registration</button>
        </form>
    </div>
       
    )
}
