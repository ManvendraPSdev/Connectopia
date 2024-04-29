// Create an Express Server 

import express from "express" ; 
import dotenv from "dotenv" ;
import cookieParser from "cookie-parser" ;

import authRoutes from "./routes/auth.routes.js" ;
import messageRoutes from "./routes/message.routes.js" ;
import userRoutes from "./routes/user.routes.js" ;

import connectToMongoDB from "./db/connecttoMONGODB.js";

const app = express() ;
const PORT = process.env.PORT||8005 ; 

dotenv.config() ;

app.use(express.json()) ;// To parse the incomming request with json payloads (from req.body)
app.use(cookieParser()) ;

app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes);
app.use("/api/users" , userRoutes);



// app.get("/" , (req , res)=>{
//     // home/root route http://localhost:8000/
//     res.send("Hello World !!");
// });

// Using middlewares , Instead of having the different routes 

app.listen(PORT , ()=> {
    connectToMongoDB() ;
    console.log(`Server is running on the port ${PORT}`)
}) ;