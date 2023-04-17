const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
  order_code: {
  type: String,
  trim: true,  
  required: true,
 },
 order_date: {
  type: String,
  trim: true
 },
 required_date: {
    type: String,
    trim: true
  },
  shipped_date: {
    type: String,
    trim: true
  },
  order_status: {
    type: String,
    trim: true
  }
});
module.exports = mongoose.model('Orders', OrderSchema)