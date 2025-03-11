const mongoose = require('mongoose')
const {Schema} = mongoose

const menuSchema = new Schema({
name: {
type: String,
trim: true,
required: true,
minlength:3,
},
recipe: String,
Image: String,
Category: String,
Price: Number,

})

const Menu = mongoose.model("Menu", menuSchema)
module.exports = Menu