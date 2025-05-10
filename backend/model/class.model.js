import mongoose,{Schema} from "mongoose";
const classschema=new Schema({
    school_id:{
        type:String,
        require: true
    },
    cname:{
        type:String,
        require: true
    },
    ccode:{
        type:String,
        require: true
    }
},
{timestamps:true})

export const school_class =mongoose.model("school_class",classschema)
