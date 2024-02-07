const express = require('express');
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const   JWT_SECRET = 'DURGAPRASADSWAIN@123'


                        //CREATE USER


router.post('/signup',
[body('username','please enter your name').notEmpty(),
body('email','please enter a valid email').isEmail(),
body('password','please enter a strong password').isLength({min:5})],
async(req,res) => {
// if there errors, return bad request and the error
    const result = validationResult(req);
    console.log(result.array)
    if(!result.isEmpty()){
        return res.status(400).json({error:result.array()})
    }
    // console.log(result.array());
    try {
        //check weather the email exist or not
        let user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({error:'This email already exist try another one'})
        }
        user = await User.findOne({username:req.body.username})
        if(user){
            return res.status(400).json({error:'This username already exist try another one'})
        }
        const hash = bcrypt.hashSync(req.body.password, 10);
        //create a new user
        user = User.create({
            username:req.body.username,
            email:req.body.email,
            password:hash
        })
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET)
        res.json({authToken})
    } catch (error) {
        console.log(error.message)
        res.status(500).send('some error occured')
    }
})




module.exports = router