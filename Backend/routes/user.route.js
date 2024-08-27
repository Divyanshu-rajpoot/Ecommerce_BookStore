import { Router } from "express";
import User from "../Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticatetoken from "./userAuth.js";
const router = Router();

//signup 

router.post("/signup", async (req, res) => {
    try {
        //destructuring data from the body
        const { username, email, password, address } = req.body;

        // check length of username is greater than 4
        if (username.length <= 4) {
            res.status(400).json({ message: "length of username should be greater than 4" });
        }

        //check if username already exists
        const userExist = await User.findOne({ username: username });
        if (userExist) {
            return res.status(400).json({ message: "username already exists" });
        }
        // check for email as well
        const userEmail = await User.findOne({ email: email });
        if (userEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        //check password length is greater than 5
        if (password.length <= 5) {
            return res.status(400).json({ message: "password length should be greater than 5" });
        }

        //hashing the password for security reasons using bcrypt 
        const hashPass = await bcrypt.hash(password, 10); //10 is the salt value 
        //now we create a user
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashPass,
            address: address
        });

        return res.status(200).json({ message: "User created successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message }); // sending the error message
    }
})

//signin
router.post("/signin", async (req, res) => {
    try {
        //descrutring the username and password

        const { username, password } = req.body;

        //check if username exists

        const existinguser = await User.findOne({ username });
        if (!existinguser) {
            return res.status(400).json({ message: "invalid credentials" });
        }


        //compare the password

        await bcrypt.compare(password, existinguser.password, (err, result) => {
            if (result) {
                //create a payload for the token
                const authclaims = [{ username: existinguser.username }, { role: existinguser.role }]
                //generate token
                const token = jwt.sign({ authclaims }, process.env.SECRET_KEY, { expiresIn: "30d" });
                return res.status(200).json({ id: existinguser.id, role: existinguser.role, token: token, success: true });
            }
            else {
                return res.status(400).json({ message: "invalid credentials" });
            }
        })


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//get user info
router.get("/get-user-info", authenticatetoken, async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select("-password"); // excluding the password 
        return res.status(200).json({ data });

    } catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
})

//update address
router.put("/update-address", authenticatetoken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { address } = req.body;
        await User.findByIdAndUpdate(id, { address: address });
        return res.status(200).json({ message: "Address updated successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server Error" });
    }
})


export default router;