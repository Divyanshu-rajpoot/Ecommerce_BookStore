import express from 'express';
import dotenv from 'dotenv';
import connectDB from './DB/connectDB.js';
import userroute from './routes/user.route.js';
import books from './routes/book.route.js';
import favourite from './routes/favourite.route.js';
import cart from './routes/cart.route.js';
import order from './routes/order.route.js';
//configure the dotenv file
dotenv.config();
const app = express();


//creating Port
const PORT = 3000 ||process.env.PORT ;

app.use(express.json());   // to parse the incoming request  with json payloads
app.use(express.urlencoded({extended: true})); // to parse the incoming request with urlencoded payloads 
 
//routes for the user 
app.use("/api/v1" , userroute); //this is user routes
app.use("/api/v1" , books); // this is book routes
app.use("/api/v1" , favourite); // this is favourite routes
app.use("/api/v1" , cart); // this is cart routes
app.use("/api/v1" , order) // this is order routes


//connecting  the db and running the server only if the db is connected
connectDB()
.then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`); //running the server
    });    
})
.catch((error)=>{
    console.log(error);
});

