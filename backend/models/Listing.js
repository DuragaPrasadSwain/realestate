const mongoose = require('mongoose')
const {Schema} = mongoose

const listingSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    regularPrice:{
        type:Number,
        required:true
    },
    discountPrice:{
        type:Number,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    parkingSpot:{
        type:Boolean,
        require:true
    },
    furnished:{
        type:Boolean,
        require:true
    },
    beds:{
        type:Number,
        require:true
    },
    bath:{
        type:Number,
        require:true
    },
    offer:{
        type:Boolean,
        require:true
    },
    imgURLs:{
        type:Array,
        require:true
    },
    useRef:{
        type:String,
        require:true
    }
},{timestamps:true}
)

module.exports = mongoose.model('listing',listingSchema)