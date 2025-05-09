import mongoose,{Schema} from "mongoose";
const schoolschema= new Schema({
    school_name:{
        type:String,
        require: true
    },
    address:{
        type:String,
        require: true
    },
  
    })


export const school = mongoose.model("school",schoolschema);
