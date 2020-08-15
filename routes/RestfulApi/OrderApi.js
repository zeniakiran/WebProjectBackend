var express = require('express');
var router = express.Router();
const validateProducts = require("../../Middlewares/validation");
var { Order } = require("../../models/OrderModel");
const auth = require("../../Middlewares/auth");
const admin = require("../../Middlewares/admin");
router.get("/", async (req, res) => {
    try {
        let productsFromDb = await Order.find();
        if(!productsFromDb) 
            return res.send("There are currently no products");
        return res.send(productsFromDb);
    }
    catch(err){
        res.status(400).send(err);
     } 
});

router.post("/", async (req,res)=>{
        let order= new Order();
        order.customerFName= req.body.customerFName;
        order.customerLName= req.body.customerLName;
        order.customerEmail= req.body.customerEmail;
        order.customerAddress = req.body.customerAddress;
        order.customerCountry = req.body.customerCountry;
        order.productsOrdered = req.body.productsOrdered;
        order.Phone = req.body.Phone;
        order.totalPrice = req.body.totalPrice;
        await order.save();
        return res.send("Product has been added to database successfully!");
    
});

    router.delete("/:id",auth,admin, async (req,res)=>{
        try{
            let orderId = await Order.findByIdAndDelete(req.params.id);
            if(!orderId) 
                return res.send("The product against this ID does not exist");

            return res.send("The product has been deleted successfully!");
        }
        catch(err){
            res.status(400).send("Invalid Id");
        }
    
});

module.exports = router;