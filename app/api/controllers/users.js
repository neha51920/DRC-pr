const userModel = require('../models/users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

const create = async(req, res, next)=>{
   try {
      const newUser = new userModel({ name: req.body.name, phone: req.body.phone, password: req.body.password });
  
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
}
const login = async (req, res, next)=>{
  try{
    console.log(req.body)
    if(req.body.phone != ""){
    const userInfo = await userModel.findOne({phone:req.body.phone});
      if (userInfo) {

        if(await bcrypt.compare(req.body.password, userInfo.password)) {

        const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
        res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
        
      }else{
        res.json({status:"error", message: "Invalid Phone/password!!!", data:null});
        }

      }
    }else{
      res.json({status:"error", message: "Please enter your Phone Number", data:null});
    }
    }catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
}

module.exports = {create,login}