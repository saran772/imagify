import mongoose from "mongoose"
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
          type:String,
        required:true,
    },
    CreditBalance:{
        type:Number,
        default:5
    }

})


const userModel=mongoose.models.user || mongoose.model("User",userSchema);
export default userModel;