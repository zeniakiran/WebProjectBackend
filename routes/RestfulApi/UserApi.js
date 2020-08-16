const express = require("express");
let router = express.Router();
let { UserModel } = require("../../models/UserModel");
var bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/register", async (req, res) => {
  let user = await UserModel.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User with given Email already exist");
  user = new UserModel();
  user.email = req.body.email;
  user.name = req.body.name;
  user.password = req.body.password;
  await user.generateHashedPassword();
  await user.save();
  let token = jwt.sign(
    { _id: user._id, name: user.name, role: user.role },
    config.get("jwtPrivateKey")
  );
  let dataToReturn ={
    name: user.name,
    email : user.email,
    token : user.token
  }
  return res.send(dataToReturn);
});
router.post("/login", async (req, res) => {
  let user = await UserModel.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User Not Registered");
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid){
    return res.status(401).send("Invalid Password");
    
  } 
  let token = jwt.sign(
    { _id: user._id, name: user.name, role: user.role },
    config.get("jwtPrivateKey")
  );
  res.send(token);
});
module.exports = router;