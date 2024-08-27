import jwt from "jsonwebtoken";


//this is the middleware to check if the user has the auth token or now or if it is valid or not
const authenticatetoken = (req, res, next) => {
    const authheader = req.header("Authorization");
    const token = authheader && authheader.split(" ")[1]; //bearer token    
    if(token == null){
        return res.status(401).json({message:"Authentication token required"});
    }
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({message:"Token Expired Sign in again"});
    }
}

export default authenticatetoken;