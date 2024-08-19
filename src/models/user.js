import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{type:String,trim:true,required:true},
    userName:{type:String,trim:true,required:true,unique:true},
    password:{type:String,trim:true,required:true},
})
const User = mongoose.model("User",userSchema)
export default User