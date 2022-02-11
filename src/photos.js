const mongoose = require('mongoose')
 
var photosSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    compressed: String,
    full: String,
    price: Number,
    purchases_count: Number,
    discription: String
})
 
var photos = mongoose.model('photos', photosSchema)
 
module.exports = photos

