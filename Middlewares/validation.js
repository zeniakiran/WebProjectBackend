const { validation } = require("../models/FurnitureModel");

function validateProducts(req,res,next){
    let { error } = validation(req.body);
    if(error)
        return res.status(400).send(error.details[0].message + "There is some error");
    next();
}

module.exports = validateProducts;