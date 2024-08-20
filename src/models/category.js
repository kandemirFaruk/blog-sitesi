import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:true,
    },
    categoryName:{
        type:String,
        required:true,
        trim:true
    }
})

const Category = mongoose.model("Category",categoriesSchema)
export default Category