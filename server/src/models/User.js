const mongoose = require('mongoose')
// const book = require('./Book')
 
const userSchema = mongoose.Schema({
    name : { type: String, required: true, trim: true},
    age : { type: Number, required: true},
    email: { type: String, required: true, trim: true},
    books : { type: [book], required: true}
})
const User = mongoose.model('User', userSchema)
module.exports = User;