const express = require('express')
const Listing = require('../models/Listing')
const router = express.Router()

router.post('/create',async(req,res)=>{
    try {
        const list = await Listing.create(req.body)
        res.json(list)
    } catch (error) {
        res.status(500).send('Internal Error')
    }
})

module.exports = router