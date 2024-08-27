import { Router } from "express";
import User from "../Models/user.model.js";
import Order from "../Models/order.model.js";
import Book from "../Models/book.model.js";
import authenticatetoken from "./userAuth.js";
const router = Router();



//place order route
router.post("/placeorder", authenticatetoken, async (req, res) => {
    try{
        const { id } = req.headers;
        const { order } = req.body;
        for (const orderdata of order){
            const newOrder = new Order({ user: id,book: orderdata._id});
            const newOrderDb = await newOrder.save();
            //saving order in user model
            await User.findByIdAndUpdate(id , {
                $push:{
                    orders: newOrderDb._id
                }
            });
            //clearing the cart of the user
            await User.findByIdAndUpdate(id , {
                $pull:{
                    cart: orderdata._id
                }
            });
        }
        return res.json({ message: "Order placed successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
});

//get order of a particular user
router.get("/getorders" , authenticatetoken , async(req,res)=>{
    try {
        const {id} = req.headers;
        const user = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" }
        });
        const ordersData = user.orders.reverse();
        return res.json({
            status: "success",
            data: ordersData
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server Error"});
    }
});

//get all orders from all users (--admin)
router.get("/getallorders" , authenticatetoken , async(req,res)=>{
    try {
        const userData = await User.find().populate({
            path: "book",
        })
        .populate({
            path: "user"
        })
        .sort({createdAt: -1});
        return res.json({
            status: "success",
            data: userData
        });
    }
    catch (error) {
        res.status(500).json({message:"Internal server Error"});
    }
});

//update order status (--admin)
router.put("/updatestatus/:id" , authenticatetoken , async(req,res)=>{
    try {
        const {id} = req.params;
        
        await Order.findByIdAndUpdate(id , {
            status: req.body.status
        });
        return res.json({status : "success" , message: "Status updated successfully"});
    }
    catch (error) {
        res.status(500).json({message:"Internal server Error"});
    }
});

export default router;