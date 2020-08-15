// creating model
var mongoose = require("mongoose");
const Joi = require('@hapi/joi');

var orderSchema = mongoose.Schema({
    customerFName : String,
    customerLName : String,
    customerEmail : String,
    customerAddress : String,
    customerCountry : String,
    productsOrdered : [String],
    Phone : Number,
    totalPrice : Number
});

var Order = mongoose.model("Order", orderSchema);

function validation(data){
    const schema = Joi.object({
        customerFName : Joi.string().alphanum().min(3).max(15).required(),
        customerLName : Joi.string().alphanum().min(3).max(15).required(),
        customerEmail : Joi.string().alphanum().min(8).max(30).required(),
        customerAddress : Joi.string().alphanum().min(10).max(100).required(),
        customerCountry : Joi.string().alphanum().min(3).max(50).required(),
        productsOrdered : Joi.required(),
        Number : Joi.number().required(),
        totalPrice : Joi.number().required(),
    });
    return schema.validate(data, {abortEarly: false});
}
module.exports.Order= Order;
module.exports.validation = validation;