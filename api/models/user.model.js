import mongoose from "mongoose";
const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://e7.pngegg.com/pngimages/798/436/png-clipart-computer-icons-user-profile-avatar-profile-heroes-black.png"
    }
},{timestamps:true});
const User=mongoose.model('User',userSchema);
//  monogdb will directly convert it into users
export default User;
// to use it anywhere in the project 