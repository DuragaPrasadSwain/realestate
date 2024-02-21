const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const auth = require('./router/auth')
const cors = require('cors')
const userInfo = require('./router/userInfo')
const listing = require('./router/listing');
const fetchuser = require('./middleware/fetchuser');
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
app.use('/api/user',userInfo)
app.use('/api/listing', listing)
app.use('/api/search', listing)



