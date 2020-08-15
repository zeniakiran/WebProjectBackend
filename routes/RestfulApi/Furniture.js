var express = require('express');
var router = express.Router();
const validateProducts = require("../../Middlewares/validation");
var { Furniture } = require("../../models/FurnitureModel");
const auth = require("../../Middlewares/auth");
const admin = require("../../Middlewares/admin");
router.get("/", async (req, res) => {
    try {
        let productsFromDb = await Furniture.find().sort({type: 1});
        if(!productsFromDb) 
            return res.send("There are currently no products");
            //res.json(productsFromDb.imgUrl)
        return res.send(productsFromDb);
    }
    catch(err){
        res.status(400).send(err);
     } 
});
router.get("/itembyid/:id", async (req, res) => {
    try {
        let productsFromDb = await Furniture.findById(req.params.id);
        if(!productsFromDb) 
            return res.send("There are currently no products");
            //res.json(productsFromDb.imgUrl)
        return res.send(productsFromDb);
    }
    catch(err){
        res.status(400).send(err);
     } 
});

router.get("/popular", async (req, res) => {
    try {
        let productsFromDb = await Furniture.find().limit(4).sort({$natural:-1});
        if(!productsFromDb) 
            return res.send("There are currently no products");
        return res.send(productsFromDb);
    }
    catch(err){
        res.status(400).send(err);
     } 
});

router.get("/Beds", async (req, res) => {
    try {
        let productsFromDb = await Furniture.find({type : "Beds"});
        if(!productsFromDb) 
            return res.send("There are currently no products");
        return res.send(productsFromDb);
    }
    catch(err){
        res.status(400).send(err);
     } 
});

router.get("/DiningTables", async (req, res) => {
    try {
        let productsFromDb = await Furniture.find({type : "DiningTable"});
        if(!productsFromDb) 
            return res.send("There are currently no products");
        return res.send(productsFromDb);
    }
    catch(err){
        res.status(400).send(err);
     } 
});

router.get("/DressingTables", async (req, res) => {
    try {
        let productsFromDb = await Furniture.find({type : "Dressing"});
        if(!productsFromDb) 
            return res.send("There are currently no products");
        return res.send(productsFromDb);
    }
    catch(err){
        res.status(400).send(err);
     } 
});

router.get("/Sofas", async (req, res) => {
    try {
        let productsFromDb = await Furniture.find({type : "Sofa"});
        if(!productsFromDb) 
            return res.send("There are currently no products");
        return res.send(productsFromDb);
    }
    catch(err){
        res.status(400).send(err);
     } 
});

router.get("/Chairs", async (req, res) => {
    try {
        let productsFromDb = await Furniture.find({type : "OfficeChair"});
        if(!productsFromDb) 
            return res.send("There are currently no products");
        return res.send(productsFromDb);
    }
    catch(err){
        res.status(400).send(err);
     } 
});

router.get("/Tables", async (req, res) => {
    try {
        let productsFromDb = await Furniture.find({type : "Tables"});
        if(!productsFromDb) 
            return res.send("There are currently no products");
        return res.send(productsFromDb);
    }
    catch(err){
        res.status(400).send(err);
     } 
});

router.get("/Wardrobes", async (req, res) => {
    try {
        let productsFromDb = await Furniture.find({type : "Wardrobes"});
        if(!productsFromDb) 
            return res.send("There are currently no products");
        return res.send(productsFromDb);
    }
    catch(err){
        res.status(400).send(err);
     } 
});

router.get("/price",async (req, res) => {
    try {
        let price = req.query.price;
        let type = req.query.type;
        let productsFromDb = await Furniture.find({
            type : type,
            price: { $gt: price } 
        });
        if(!productsFromDb) 
            return res.send("There are currently no products");
        return res.send(productsFromDb);
    }
    catch(err){
        res.status(400).send(err);
     } 
});

router.post("/",auth,admin,validateProducts, async (req,res)=>{
        let furniture= new Furniture();
        furniture.type= req.body.type;
        furniture.name= req.body.name;
        furniture.price= req.body.price;
        furniture.imgUrl = req.body.imgUrl;
        await furniture.save();
        return res.send("Product has been added to database successfully!");
    
});

router.put("/:id",auth,admin, validateProducts,async (req,res)=>{
        let productId = await Furniture.findById(req.params.id);
        if(!productId) 
            return res.send("The product against this ID does not exist");
        productId.type= req.body.type;
        productId.name= req.body.name;
        productId.price= req.body.price;
        productId.imgUrl = req.body.imgUrl;
        await productId.save();
        return res.send("Your product has been updated successfully!");
});

    router.delete("/:id",auth,admin, async (req,res)=>{
        try{
            let productId = await Furniture.findByIdAndDelete(req.params.id);
            if(!productId) 
                return res.send("The product against this ID does not exist");

            return res.send("The product has been deleted successfully!");
        }
        catch(err){
            res.status(400).send("Invalid Id");
        }
    
});

module.exports =  router;