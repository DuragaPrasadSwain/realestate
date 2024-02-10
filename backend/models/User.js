// import mongoose from "mongoose";
const mongoose = require('mongoose');
// import { Schema } from "mongoose";
const {Schema} = mongoose;
const userSchema = new Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    profilepic:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
    },
    date:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user',userSchema)