import mongoose ,{Schema}from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const studentSchema = new mongoose.Schema({
    school_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "school",
        required: true
    },
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "school_class",
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    student_email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone:{
        type:Number,
        require:true
        
    },
    avatar:{
        type:String,
        require:true
    }
});











studentSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

studentSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

studentSchema.methods.generateAccessToken = function(){
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




















export const student = mongoose.model("student", studentSchema);