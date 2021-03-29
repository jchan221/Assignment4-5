const mongoose = require('mongoose'),
    validator = require('validator')

const accountSchema = new mongoose.Schema({
    firstname:{
        type:String,
        require: true,
        trim: true
    },
    lastname:{
        type:String,
        require: true,
        trim: true
    },
    email:{
        type:String,
        require: true,
        trim: true
    },
    password:{
        type:String,
        require: true,
        trim: true
    },
})

const account = mongoose.model('user', accountSchema);

module.exports = account