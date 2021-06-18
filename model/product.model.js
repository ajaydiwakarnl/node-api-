const mongoose = require('mongoose');
const validator = require('validator');

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'This field is required'],
    },
    sku:{
        type:String,
        required:[true,'This field is required'],
        unique:[true, 'This sku number is taken.'],
    },
    condition:{
        type:String,
        default:"new",
    },
    size_name:{
        type:String,

    },
    size_qty:{
        type:String,

    },
    size_price:{
        type:String,

    },

    category:{
        type:String,
    },

    sub_category:{
        type:String,
    },

    child_category:{
        type:String,
    },

    estimate_shipping_time :{
        type:String,

    },

    whole_sale_qty :{
        type:String,

    },
    whole_sale_discount:{
        type:String,

    },

    stock:{
        type:String,
    },

    description:{
        type:String,
    },

    return_policy :{
        type:String,
    },


    address:{
        type:String,
    },

    city:{
        type:String,
    },

    country:{
        type:String,
    },

    postal_code:{
        type:String,
    },

    image:{
        type: String,
    },

    price:{
        type:String,
    },

    youtube_url:{
        type:String
    },

    status:{
        type:Number,
        default:1,
    }

});



module.exports = mongoose.model('product',schema);
