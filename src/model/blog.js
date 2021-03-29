const mongoose = require('mongoose'),
    validator = require('validator')

const blogSchema = new mongoose.Schema({
    firstname:{
        type:String,
        require: true,
        trim: true
    },
    title:{
        type:String,
        require: true,
        trim: true
    },
    body:{
        type:String,
        require: true,
        trim: true
    },
})

const blog = new mongoose.model('blog', blogSchema);

module.exports = blog