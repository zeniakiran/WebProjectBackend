// creating model
var mongoose = require("mongoose");
const Joi = require('@hapi/joi');

var furnitureSchema = mongoose.Schema({
    type : String,
    name : String,
    price : Number,
    imgUrl : String
});

var Furniture = mongoose.model("Furniture", furnitureSchema);

function validation(data){
    const schema = Joi.object({
        type : Joi.string().regex(/^[A-Za-z]+$/).min(3).max(15).required(),
        name : Joi.string().alphanum().min(3).max(15).required(),
        price : Joi.number().min(5000).max(100000).required(),
        imgUrl : Joi.required()
    });
    return schema.validate(data, {abortEarly: false});
}
module.exports.Furniture= Furniture;
module.exports.validation = validation;