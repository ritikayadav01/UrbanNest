import express from "express";
import mongoose from "mongoose";
import userRouter from './routes/user.route.js'
mongoose.connect("mongodb://localhost:27017").then(()=>{
    console.log("connected to monogodb!!");
}).catch((err)=>{
    console.log(err);
})
 const app =express();
 app.listen(3000,()=>{
    console.log("Server is listening ")
 });

//  creating api routes 
// req: the data we get from the client side 
// response : we send data from the server 
app.use("/api/user",userRouter)