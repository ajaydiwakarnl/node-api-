const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const schema = new mongoose.Schema({
    name:{
        type:String,

    },
    email:{
        type:String,
        unique:[true],
    },
    password:{
        type:String,
        minlength:[6],
    },
    phone:{
        type:String,
        minlength: 10,
    },
    role:{
        type:String,
        default:"users",
        enum: ["admin", "users"]
    },
    image:{
        type: String,
        default:null
    },
    isBlocked:{
        type:Number,
        default:0
    },





});

schema.pre('save',async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model('users',schema);
