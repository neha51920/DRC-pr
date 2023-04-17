const orderModel = require('../models/orders');
const getById = async (req, res, next) => {
  try{
    console.log(req.params)
    const orderById = await orderModel.findById(req.params.orderId);
    res.json({status:"success", message: "order found!!!", data:{orders: orderById}});
  }catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

const getAll = async (req, res, next)=> {
  let ordersList = [];
  const allorder = [];
  const orders = await orderModel.find({});
  for (let order of orders) {
  ordersList.push({id: order._id, order_code: order.order_code, order_date: order.order_date,required_date: order.required_date,shipped_date: order.shipped_date, order_status: order.order_status});
  }
  res.json({status:"success", message: "orders list found!!!", data:{orders: ordersList}});
 }

 const getAllWithShort = async (req, res, next)=> {
  const sort  = {}
  if(req.query.sortBy && req.query.OrderBy){
    sort[req.query.sortBy]   = req.query.OrderBy === 'desc' ? -1 : 1
  }
  const orders = await orderModel.find({}).select().sort(sort);
  res.json({status:"success", message: "orders list found!!!", orders});
 }
 
const getordersWithPagination = async (req, res, next)=> {
const orders = await orderModel.find({}).limit(req.query.limit).skip(req.query.skip);
res.json({status:"success", message: "orders list found!!!", orders});
}

const updateById = async (req, res, next) => {
try{
  const orderById = await orderModel.findByIdAndUpdate(req.params.orderId,req.body);
  res.json({status:"success", message: "order updated successfully!!!", data:null});
  }catch(err){
    console.log(err);
      res.status(500).json(err);
  }
}

const deleteById = async(req, res, next) => {
  try{
    console.log(req.params.orderId)
    const deletedorder =await orderModel.findByIdAndDelete(req.params.orderId);
    res.json({status:"success", message: "order deleted successfully!!!", data:null});
  }catch(err){
    console.log(err);
      res.status(500).json(err);
  }
 }
const create = async(req, res, next) => {
  try{
    const neworder = await new orderModel(req.body);
    const order = await neworder.save();
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
 }


module.exports = {getById, getAll, updateById ,deleteById, create ,getAllWithShort, getordersWithPagination}