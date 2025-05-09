import mongoose from "mongoose";
export const connectDB= async()=>{
    try {
     const connectDB= await  mongoose.connect(`mongodb://localhost:27017/school`)
        console.log(`conneted || host name is ${connectDB.connection.host}`)
    } catch (error) {
        console.log("there is connetion error",error)
        
    }
}