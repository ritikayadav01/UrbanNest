import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
dotenv.config();
// connecting from mongodb using mongoose (can also warp it in the asyc await we dont know where is our database )
 
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("connected to monogodb!!");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
  console.log("Server is listening ");
});

//  creating api routes
// req: the data we get from the client side
// response : we send data from the server
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);


// creating a middleware 

// erro->the error we are getting 
// req->the request client made 
// res->the response we will give 
// next->next middleware 
app.use((err,req,res,next)=>{
  // get the error code if dont->500->internal server error
  const statusCode=err.statusCode||500;
  const message=err.message||'Internal server error';
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
  })
})