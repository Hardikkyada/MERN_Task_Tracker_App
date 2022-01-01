
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    name:String,
    password:String,
    email:String,
    age:Number

})

const UserModel = mongoose.model("user",userSchema,"user");

module.exports = UserModel;
