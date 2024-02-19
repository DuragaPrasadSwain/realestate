const express = require('express')
const Listing = require('../models/Listing')
const router = express.Router()
const jwt = require('jsonwebtoken');

JWT_SECRET = 'DURGAPRASADSWAIN@123'


//create listing

router.post('/create',async(req,res)=>{
    try {
        const list = await Listing.create(req.body)
        res.json(list)
    } catch (error) {
        res.status(500).send('Internal Error')
    }
})



//fetching listing


router.get('/getlist',async(req,res)=>{
    try {
        const token = req.headers['auth-token']
        const authtoken = jwt.verify(token,JWT_SECRET)
        console.log(authtoken.user.id);
        const list = await Listing.find({useRef:authtoken.user.id})
        res.json({list})

    } catch (error) {
        res.status(500).send('internal Error')    }
})




//delete listing 


router.delete('/deletelist/:id',async (req,res)=>{ 
    try {
        let authtoken = req.headers['auth-token']
        let Userid = jwt.verify(authtoken,JWT_SECRET)
        let list = await Listing.findById(req.params.id)
        if(Userid.user.id===list.useRef){
            list = await Listing.findByIdAndDelete(req.params.id)
            res.status(201).send('list is deleted')
        }else{
            res.status(404).send('User Invalid')
        }
} catch (error) {
    res.status(500).send('internal error')
}
    

})




//updatelist 





router.put('/updatelist/:id', async (req,res)=>{
    try {
        let authtoken = req.headers['auth-token']
        let Userid = jwt.verify(authtoken,JWT_SECRET)
        let list = await Listing.findById(req.params.id)
        if(Userid.user.id===list.useRef){
            list = await Listing.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.json(list)
        }else{
            res.status(404).send('User Invalid')
        }
} catch (error) {
    res.status(500).send('internal error')
}
 })




 //fetch single list

 router.get('/getalist/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const list = await Listing.findOne({_id:id})
        res.json(list)

    } catch (error) {
        res.status(500).send('internal Error')    }
})

module.exports = router