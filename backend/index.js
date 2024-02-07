// import express from "express";
const express = require('express');
// import mongoose from 'mongoose'
const mongoose = require('mongoose');
// import dotenv from 'dotenv'
const dotenv = require('dotenv')
// import auth from './router/auth.js'
const auth = require('./router/auth')
const cors = require('cors')
dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to mongodb");
}).catch((err)=>{
    console.log(err)
})

const app = express()
app.use(cors())

app.use(express.json())

app.listen(3000,()=>{
    console.log("Backend server 3000")
})

app.use('/api/auth',auth)

