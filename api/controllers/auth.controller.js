import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
// use next to use the middleware 
export const signup = async (req, res,next) => {
  // we need the information from the browser
  // this is coming from the body
  // destrcuture what you are getting from the body
  const { username, email, password } = req.body;
  // salt number ->10
  const hashedPassword = bcryptjs.hashSync(password, 10);
  // we need to save it in the database in user model
  const newUser = new User({ username, email, password: hashedPassword });
  // give error while saving it in the database :like you cant have the same name / email ->will show the message to the user 
  try {
    await newUser.save();
    res.status(201).json("user created succesfully ");
  } catch (error) {
    // next(errorHandler(550,"error form a function "));
    next(error);
  }
};
