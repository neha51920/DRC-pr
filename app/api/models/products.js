const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
 title: {
  type: String,
  trim: true,  
  required: true,
 },
 size: {
  type: String,
  trim: true
 },
 colour: {
    type: String,
    trim: true
  },
    price: {
    type: String,
    trim: true
  },
    quantity: {
    type: String,
    trim: true
  }
});
module.exports = mongoose.model('Products', ProductSchema)