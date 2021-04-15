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
        default:null,
    },
    size_qty:{
        type:String,
        default:null,
    },
    size_price:{
        type:String,
        default:null,
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
        default:null,
    },

    whole_sale_qty :{
        type:String,
        default:null,
    },
    whole_sale_discount:{
        type:String,
        default:null,
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
        type:string,
    },

    image:{
        type:String,
    },

    price:{
        type:String,
    },

    youtube_url:{
        type:String
    }

});



module.exports = mongoose.model('product',schema);
