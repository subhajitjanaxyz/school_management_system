import mongoose ,{Schema}from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const adminSchema=new Schema({
    fullname:{
        type: String,
        require:true
    },
    email:{
        type:String,
        require:true,
        uniqe: true
    },
    password:{
        type:String,
        require:true,
        uniqe: true
    },
    school_id:{
        type:Schema.Types.ObjectId,
        ref:"school"
    },

    
},
{timestamps:true})





adminSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

adminSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

adminSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
         
           
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


export const admin=mongoose.model("admin",adminSchema);