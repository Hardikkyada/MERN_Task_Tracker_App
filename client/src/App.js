import './App.css';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hader from './componets/Hader';
import Tasks from './componets/Tasks';
import AddTask from './componets/AddTask';
import Footer from './componets/Footer';
import About from './componets/About';
import axios from "axios";
import Update from './componets/Update';
import {Login} from './componets/Login';
import { AddUser } from './componets/AddUser';

function App() {

  const [showAddTask, setshowAddTask] = useState(false)
  const [showUpTask, setshowUpTask] = useState(false)
  const [tasks, settasks] = useState([])
  const [fstask, fssettask] = useState([])
  const [showLogin, setshowLogin] = useState(false);
  const [user, setuser] = useState([]);

  useEffect(() => {
    axios.get('/api/list').then(res => {
      settasks(res.data.data);
    });
  }, [])



//Addtask

const addTask = async (task) => {

   axios.post('/api/addtask',task).then(res => {
     settasks([...tasks, res.data.data])
    });

    /*  const id = Math.floor(Math.random() * 10000)+1
      const newtask = {id,...task}
      settasks([...tasks,newtask])*/

  }

  //delete task

  const deltask = async (id) => {

  axios.delete("/api/user/"+id).then(res =>{
    settasks(tasks.filter((task) => task.id !== id))
    console.log(res.data.data);
  });
  }

  const ftask = async (id) => {
    const udata = await axios.get("/api/user/" + id);
    return udata.data.data
  }

  //Toggle Remider

  const toremder =  async (id) => {

    const oldtask = await ftask(id);

    const uptask = {remider: !oldtask.remider }
    

    axios.put("/api/user/"+id,uptask).then(res=>{
      const data = res.data.data;
      settasks(tasks.map((t) => t.id === id ? { ...t, remider: data.remider } : t))
    });

    /*const res = await axios.put("/api/user/" + id, uptask);
    const data = res.data.data;
    settasks(tasks.map((t) => t.id === id ? { ...t, remider: data.remider } : t))*/

  }
  //updateuser

  const updateuser = async (id) =>{
    const gettask = await ftask(id);
    console.log(gettask);
    fssettask(gettask);
    setshowUpTask(!showUpTask)
  }
  const uptask = async (id, updatetask) =>{
    axios.put("/api/userupdate/" + id, updatetask).then(res => {
      const data = res.data.data
      settasks(tasks.map((t) => t.id === id ? { ...t, text: data.text,day:data.day } : t))
    });
  }
  
  return (
    <Router>
      <div className='container'>
        {console.log(tasks)}
        {user._id && <Hader title="Task Tracker"
          onAdd={() => setshowAddTask(!showAddTask)} showAdd={showAddTask} />}
        <Routes>

          <Route
            path='/'
            element={
              <div>
                {!user._id && <Login onAdd={() => setshowLogin(!showLogin)} showAdd={setshowLogin} setLogin={setuser} />}
                {user._id && showAddTask && <AddTask onAdd={addTask}/>}
                {user._id && showUpTask && <Update userdata={fstask} updata={uptask} /> }
                {user._id && (tasks.length > 0 ? (
                  <Tasks tasks={tasks} onDelete={deltask} onToggle={toremder} onUpdate={updateuser} />)
                  : ('No Task'))}
                {!user._id && showLogin && <AddUser /> }
              </div>
            } />

          <Route path='/about' element={<About />} />

        </Routes>
        <Footer />

      </div>

    </Router>
  )
}

export default App;
