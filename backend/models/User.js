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
    date:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user',userSchema)