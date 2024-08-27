import { Router } from "express";
import User from "../Models/user.model.js";
import Book from "../Models/book.model.js";
import jwt from "jsonwebtoken";
import authenticatetoken from "./userAuth.js";

const router = Router();

//we are using put method to add and remove the book from favourite because we are not creating any new resource
//add book to favourite
router.put("/addfavourite" , authenticatetoken , async(req,res)=>{
    try {
        const {id , bookid} = req.headers;
        const user = await User.findById(id); 
        const isbookfavourite = user.favorite.includes(bookid); //checking if the book is already in favourite or not
        if(isbookfavourite){
            return res.status(200).json({message:"Book is already in favourite"});
        }
        await User.findByIdAndUpdate(id , {
            $push:{    // $push is used to add the book to the favourite array
                favorite: bookid
            }
        })
        return  res.status(200).json({message:"Book added to favourites "});
    } catch (error) {
        res.status(500).json({message:"Internal server Error"});
    }
})


//delete book from favourite
router.put("/removefromfavourite" , authenticatetoken , async(req,res)=>{
    try {
        const {id , bookid} = req.headers;
        const user = await User.findById(id); 
        const isbookfavourite = user.favorite.includes(bookid); //checking if the book is already in favourite or not
        if(isbookfavourite){
            await User.findByIdAndUpdate(id , {
                $pull:{    // $push is used to add the book to the favourite array
                    favorite: bookid
                }
            })
        }
        return  res.status(200).json({message:"Book removed from favourites "});
    } catch (error) {
        res.status(500).json({message:"Internal server Error"});
    }
})


//get favourite books of a user
router.get("/getfavourites" , authenticatetoken , async(req,res)=>{
    try {
        const {id} = req.headers;
        const user = await User.findById(id).populate("favorite"); //populating the favourite array
        const favouritebooks = user.favorite;
        res.status(200).json({data : favouritebooks});
    } catch (error) {
        res.status(500).json({message:"Internal server Error"});
    }
});



export default router;