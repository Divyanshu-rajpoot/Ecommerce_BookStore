import { Router } from "express";
import User from "../Models/user.model.js";
import Book from "../Models/book.model.js";
import jwt from "jsonwebtoken";
import authenticatetoken from "./userAuth.js";


const router = Router();


//put book to cart
router.put("/addtocart" , authenticatetoken , async(req,res)=>{
    try {
        const {id , bookid} = req.headers;
        const user = await User.findById(id); 
        const isbookincart = user.cart.includes(bookid); //checking if the book is already in cart or not
        if(isbookincart){
            return res.status(200).json({message:"Book is already in cart"});
        }
        await User.findByIdAndUpdate(id , {
            $push:{    // $push is used to add the book to the cart array
                cart: bookid
            }
        })
        return  res.status(200).json({message:"Book added to cart "});
    } catch (error) {
        res.status(500).json({message:"Internal server Error"});
    }
});

//delete book from cart
router.put("/removefromcart/:bookid" , authenticatetoken , async(req,res)=>{
    try {
        const {bookid} = req.params;
        const {id} = req.headers;
        const user = await User.findById(id); 
        const isbookincart = user.cart.includes(bookid); //checking if the book is already in cart or not
        if(isbookincart){
            await User.findByIdAndUpdate(id , {
                $pull:{    // $push is used to add the book to the cart array
                    cart: bookid
                }
            })
        }
        return  res.status(200).json({message:"Book removed from cart "});
    } catch (error) {
        res.status(500).json({message:"Internal server Error"});
    }
})

//get cart books of a user
router.get("/getcart" , authenticatetoken , async(req,res)=>{
    try {
        const {id} = req.headers;
        const user = await User.findById(id).populate("cart"); //populating the cart array
        const cartbooks = user.cart.reverse(); // reversing the cart books latest data on top

        res.status(200).json({data : cartbooks});
    } catch (error) {
        res.status(500).json({message:"Internal server Error"});
    }
});



export default router;