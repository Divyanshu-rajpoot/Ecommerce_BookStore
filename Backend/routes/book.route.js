import { Router } from "express";
import User from "../Models/user.model.js";
import Book from "../Models/book.model.js";
import jwt from "jsonwebtoken";
import authenticatetoken from "./userAuth.js";


const router = Router();

//add book --admin role
router.post("/addbook", authenticatetoken, async (req, res) => {
    try {
        const { id } = req.headers;  // getting the id from the headers 
        const user = await User.findById(id); //finding the user by id
        if (user.role !== "admin") {
            return res.status(401).json({ message: "You are not authorized to add book" }); //checking if the user is admin or not
        }
        const book = await Book.create({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        })
        res.status(200).json({ message: "Book added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
})


// update books
router.put("/updatebook", authenticatetoken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        })
        return res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
});


//delete book --admin
router.delete("/deletebook", authenticatetoken, async (req, res) => {
    try {
        const { bookid } = req.headers; //getting the bookid from the headers
        await Book.findByIdAndDelete(bookid);  //finding the book by id and deleting it
        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
});

//get all books 
router.get("/getallbooks", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt : -1 }); //finding all the books in sorted order
        return res.status(200).json({ success : true , data : books});
    } catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
});

//get recently added books limit 4
router.get("/getrecentbooks", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt : -1 }).limit(5); //finding the recently added books
        return res.status(200).json({ success : true , data : books});
    } catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
});

//get book by id
router.get("/getbookbyid/:id" , async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id); //finding the book by id
        return res.status(200).json({ success : true , data : book});
    } catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
});


export default router; // exporting the router