import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default: "https://www.gravatar.com/avatar"
    },
    role:{
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    favorite:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ],
    cart:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ],
    orders:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
}
, {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;
