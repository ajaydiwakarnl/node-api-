const mongoose = require('mongoose');
const schema = new mongoose.Schema( {
    userId:{
      type:String
    },
    fullAddress:{
        type:String,
        default:null
    },
    houseFlatNo:{
        type:String,
        default:null,
    },
    landMark:{
        type:String,
        default:null,
    },
    latitude:{
        type:Number,
        default:0
    },
    longitude:{
        type:Number,
        default:0
    },
    type:{
        type:String,
        default:"other",
        enum: ["home", "work","other"]
    }
})

module.exports = mongoose.model('address',schema);

