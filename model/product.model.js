const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'This field is required'],
        validate:[validator.isAlpha,'Names contains only alphabets ']
    },
    email:{
        type:String,
        required:[true,'This field is required'],
        validate:[validator.isEmail,'Not valid email'],
        unique:[true, 'This email address is taken.'],
    },
    password:{
        type:String,
        minlength:[6,'Password should be at least six characters'],
        required: [true,'This field is required'],
    },
    phone:{
        type:String,
        minlength: 10,
        required:true,
    },
    status:{
      type:Number,
       default:0
    },
    role:{
        type:Number,
    }

});

schema.pre('save',async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model('users',schema);
