var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");
var userSchema = mongoose.Schema({
  email: String,
  name: String,
  password: String,
  role: {
    type: String,
    default: "admin",
  }
});
userSchema.methods.generateHashedPassword = async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};
var UserModel = mongoose.model("UserModel", userSchema);

function validateUserSignup(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().min(10).max(30).required(),
    password: Joi.string().min(5).max(10).required(),
  });
  return schema.validate(data, { abortEarly: false });
}
function validateUserLogin(data) {
  const schema = Joi.object({
    email: Joi.string().email().min(10).max(30).required(),
    password: Joi.string().min(5).max(10).required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.UserModel = UserModel;
module.exports.validateUserSignup = validateUserSignup; //for sign up
module.exports.validateUserLogin = validateUserLogin; // for login