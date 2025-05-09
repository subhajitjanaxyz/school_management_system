import mongoose ,{Schema}from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const teacherschema= new Schema({
    fullname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true 
    }
    ,
    password:{
        type:String,
        require:true,
    },

    age:{
        type : Number,
        require: true
    },
    avatar:{
        type:String,
        require:true
    },
    school_id:{
        type:Schema.Types.ObjectId,
        ref:"school"
    },
    gender:{
        type:String,
       enum: ['male', 'female'],
    },
    phone:{
        type:Number,
      require:true
      
    }
    })










    teacherschema.pre("save", async function (next) {
        if(!this.isModified("password")) return next();
    
        this.password = await bcrypt.hash(this.password, 10)
        next()
    })
    
    teacherschema.methods.isPasswordCorrect = async function(password){
        return await bcrypt.compare(password, this.password)
    }
    
    teacherschema.methods.generateAccessToken = function(){
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
   

























export const teacher = mongoose.model("teacher",teacherschema);
