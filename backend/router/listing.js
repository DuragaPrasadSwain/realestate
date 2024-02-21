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




//search




router.get('/searchlist',async(req,res)=> {
    try {
        console.log("hii1");
        const limit = parseInt(req.query.limit) || 9;
        console.log("hii2");
        const startIndex = parseInt(req.query.startIndex) || 0
        console.log("hii3");
        let offer = req.query.offer;
        console.log("hii4");
        if(offer === undefined || offer === 'false'){
            offer = {$in:[false, true]};
        }
        console.log("hii5");
        let furnished = req.query.furnished;
        console.log("hii6");
        if(furnished === undefined || furnished === 'false'){
            furnished = {$in:[false,true]}
        }
        console.log("hii7");
        let parkingSpot = req.query.parkingSpot;
        console.log("hii8");
        if(parkingSpot === undefined || parkingSpot === 'false'){
            parkingSpot = {$in:[false,true]}
        }
        console.log("hii9");
        let type = req.query.type;
        console.log("hii10");
        if(type === undefined || type === 'all'){
            type = {$in:['rent','sell']}
        }
        console.log("hii11");
        const searchTerm = req.query.searchTerm || '';
        console.log("hii12");
        const sort = req.query.sort || 'createdAt';
        console.log("hii13");
        const order = req.query.order || 'desc' ;
        console.log("hii14");
        const listings = await Listing.find({
            name:{$regex:searchTerm, $options:'i'},
            offer,
            furnished,
            parkingSpot,
            type
        })
        .sort({[sort]:order})
        .limit(limit)
        .skip(startIndex) 

        console.log("hii15");
        return res.status(200).json(listings)
    } catch (error) {
        res.status(500).send('internal error')
    }
})

module.exports = router