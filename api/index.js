import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
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
app.listen(3000, () => {
  console.log("Server is listening ");
});

//  creating api routes
// req: the data we get from the client side
// response : we send data from the server
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
