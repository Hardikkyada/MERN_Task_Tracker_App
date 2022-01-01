const { response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());
const port = 4000;
const mongoose = require("mongoose");

const TaskData = require("./model/TaskData");
const User = require("./model/User");



mongoose
    .connect("mongodb://localhost:27017/dcs")
    .then(() => console.log("mongo db connected"));

app.get("/api", (req, res) => res.send("Hello Fullstack!"));

// Get list of all users
app.get("/api/list", async (req, res) => {
    const userList = await TaskData.find();
    
    if (userList.length === 0) {
        return res.json({ data: "no users in fullstack" });
    }
    return res.json({ data: userList });
});

// Register user
app.post("/api/reg", (req, res) => {
    const newUser = req.body;
    User.create(newUser);
    return res.json({ data: newUser });
});

//Login

app.post("/api/login", async (req, res) => {

    const uname = req.body.name;
    const pass = req.body.password;

    const udata = await User.findOne({
        name: uname,
        password: pass
    });

    if (udata) {
        res.json({ data: udata });

    } else {
        res.json({ data: "Not Found User" });
    }
});


//Addtask
app.post("/api/addtask", (req, res) => {
    const newtask = req.body;
    TaskData.create(newtask);
    return res.json({ data: newtask });
});


//Search other users

app.get('/api/user/:id', async (req, res) => {
    const uname = req.params.id;

    const cdata = await TaskData.findOne({
        id: uname
    });

    if (cdata) {
        res.json({ data: cdata });
    } else {
        res.json({ data: "User not found" });
    }
});

//Update own details(user should not be able to update other user's details)

app.put("/api/user/:id", async (req, res) => {
    const remider = req.body.remider;
    const id = req.params.id;
    const updateuser = await TaskData.findOneAndUpdate(
        { id : id },
        {remider: remider},
        { new: true }
    );
    return res.json({ data: updateuser });
});

app.put("/api/userupdate/:id",async(req,res) =>{
    const id = req.params.id;
    const text = req.body.text;
    const day = req.body.day;

    const updateuser = await TaskData.findOneAndUpdate(
        {id : id},
        {text:text,day:day},
        {new:true}
    );

    return res.json({data : updateuser});
});


//Delete own account(user should not be able to delete other user accounts)

app.delete("/api/user/:id", async (req, res) => {

    const deleteuser = await TaskData.findOneAndDelete({
        id: req.params.id,
    });
    return res.json({ data: deleteuser });
});

app.listen(port, () => console.log(`server running on port 4000`));


//Register / Login
//List all existing tasks
//Add / Update / Remove a Task
//Toggle Reminder on a task