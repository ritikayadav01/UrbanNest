import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"; 
// use next to use the middleware
export const signup = async (req, res, next) => {
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

export const signin = async (req, res, next) => {
  // get data from req.body

  const { email, password } = req.body;
  //  we need to authenticate the email
  try {
    //  we are returing the error using our middleware
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Credentials "));
    // id is the best practice to use (safe inside the mongodb)
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const {password:pass,...rest}=validUser._doc;
    //  save the token in the cookie
    // we will not pass thpasword 
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};


export const google =async(req,res,next)=>{
  try {
    const user=await User.findOne({email:req.body.email})
    if(user)
    {
      const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
      const {password:pass,...rest}=user._doc; 
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
    }
    else
    {
      const generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
      const hashedPassword=bcryptjs.hashSync(generatedPassword,10);
      const newUser=new User({username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-8),email:req.body.email,password:hashedPassword,avatar:req.body.photo})

      await newUser.save();
      const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET)
      const {password:pass,...rest}=newUser._doc; 
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
    }
  } catch (error) {
    next(error)
    
  }
}