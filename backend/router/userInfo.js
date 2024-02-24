const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

JWT_SECRET = 'DURGAPRASADSWAIN@123'



/// Update user

router.put('/update/:id',async(req,res)=>{


    try {
        let user = await User.findById(req.params.id)
        if(!user){return res.status(400).send("not found")}

        const token = req.header('auth-token')

        if(!token){return res.status(400).send("not found login")}

        const authtoken = jwt.verify(token,JWT_SECRET)

        if(!(req.params.id===authtoken.user.id)){
            return res.status(401).send('invalid user update')
        }


        const {username, email, password, profilepic} = req.body

        const newUpdate = {}
        // console.log(newUpdate);


        if(username){newUpdate.username = username}
        if(email){newUpdate.email = email}
        if(password){newUpdate.password = bcrypt.hashSync(password,10)}
        if(profilepic){newUpdate.profilepic = profilepic}

        // console.log(newUpdate.username )

        



        user = await User.findByIdAndUpdate(req.params.id,{$set:newUpdate},{new:true})


         res.json({user})


    } catch (error) {
        console.log(error.message)
        res.status(500).json('internal error found')
    }
})




//email user





router.get('/fetchauser/:id', async (req, res) => {


    try {
        const user = await User.findById(req.params.id)
        
        if(!user){return res.status(404).send('User not found')}

        const {email:email} = user._doc

        let json = res.json(email)

        // console.log({json})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal server error occured')
    }


})










/////// delete user


router.delete('/delete/:id', async(req,res)=>{

    try {
        let user = await User.findById(req.params.id)
    if(!user){
        return res.status(400).send("user not found")
    }

    let token =  req.header('auth-token')

    if(!token){
        return res.status(400).send("user not found login")
    }

    let data = jwt.verify(token,JWT_SECRET)

    if(!(req.params.id === data.user.id)){
        return res.status(401).send('not a valid user to delete')
    }

    // console.log({user})
    // console.log(req.params.id)

    user = await User.findByIdAndDelete(req.params.id)

    // console.log(user)

    res.json({"success":"user is deleted"})
    } catch (error) {
        res.status(500).send('Internal Error')
    }

})



module.exports = router;