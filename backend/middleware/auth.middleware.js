import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import User from "../models/user.models.js";

dotenv.config()

const protectRoute=async(req,res,next)=>{
    try {
         const accessToken=req.cookies.accessToken;
        // console.log(accessToken)
         if(!accessToken){
            return res.status(401,"Unauthorized-no acess token is there");
         }

         try {
            const decoded=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
           // console.log(decoded)
            const user=await User.findById(decoded.userid).select("-password");
            req.user=user;
            //console.log(req.user)
            next();
         } catch (error) {
            if(error.name==="TokenExpiredError"){
                return res.status(401,"Unauthorized-token expired");
            }
            throw error;
         }
    } catch (error) {
       return res.status(500,error.message)
    
    }
}

export {protectRoute}