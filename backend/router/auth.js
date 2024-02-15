const express = require('express');
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// const   JWT_SECRET = process.env.JWT_SECRET_ENV
JWT_SECRET = 'DURGAPRASADSWAIN@123'


//CREATE USER


router.post('/signup',
    [body('username', 'please enter your name').notEmpty(),
    body('email', 'please enter a valid email').isEmail(),
    body('password', 'please enter a strong password').isLength({ min: 5 })],
    async (req, res) => {
        // if there errors, return bad request and the error
        const result = validationResult(req);
        console.log(result.array)
        if (!result.isEmpty()) {
            return res.status(400).json({ error: result.array() })
        }
        // console.log(result.array());
        try {
            //check weather the email exist or not
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ error: 'This email already exist try another one' })
            }
            user = await User.findOne({ username: req.body.username })
            if (user) {
                return res.status(400).json({ error: 'This username already exist try another one' })
            }
            const hash = bcrypt.hashSync(req.body.password, 10);
            //create a new user
            user = User.create({
                username: req.body.username,
                email: req.body.email,
                password: hash
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            res.json({ authToken })
        } catch (error) {
            console.log(error.message)
            res.status(500).send('some error occured')
        }
    })



//signin





router.post('/signin', [
    body('email', 'please enter a valid email').isEmail(),
    body('password', 'please enter a valid password').isLength({ min: 5 })
], async (req, res) => {
    const result = validationResult(req)
    console.log(result.array);
    if (!result.isEmpty()) {
        return res.status(400).json({ error: result.array() })
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        console.log(req.body)
        if (!user) {
            return res.status(400).json({ error: "Email or Password is not valid" })
        }

        const passwordCompare = bcrypt.compareSync(req.body.password, user.password)
        

        if (!passwordCompare) {
            return res.status(400).json({ error: "Email or Password is not valid" })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)
        

        res.json({ authToken })

    } catch (error) {
        console.log(error.message)
        res.status(500).send('some error occured')
    }
})





//fetchuser





router.get('/fetchuser',fetchuser, async (req, res) => {


    try {
        const user = await User.findOne({ _id: req.body.id })

        let json = res.json(user)

        // console.log({json})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal server error occured')
    }


})










//google






router.post('/google', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })

        if (user) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)

            return res.json({ authToken })
        } else {
            let hash = (Math.random()).toString(36).slice(-8) + (Math.random()).toString(36).slice(-8)
            const hashpassword = bcrypt.hashSync(hash, 10)
            user = User.create({
                username: (req.body.email).replace("@gmail.com", ""),
                email: req.body.email,
                password: hashpassword
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            return res.json({ authToken })
        }

    } catch (error) {

    }
})








module.exports = router