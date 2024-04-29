// Creating the JWT token and set it into the cookie 
import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId , res) =>{
    const token  = jwt.sign({userId} , process.env.JWT_SECRET , {
        expiresIn: '15d'
    })
    //Token is Created Saving it into the cookie 
    res.cookie("jwt" , token , {
        maxAge: 15*24*60*60*1000 , // Milisecond format 
        httpOnly: true , // Prevent XXS attack cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross site request forgery attacks
        secure: process.env.NODE_ENV !=="development"
    })
}

export default generateTokenAndSetCookie ;
