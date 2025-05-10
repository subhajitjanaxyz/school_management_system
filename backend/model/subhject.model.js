import mongoose,{Schema} from "mongoose";
const subjectschema= new Schema({
    subject:{
        type:String,
        require: true
    },
    code:{
        type:String,
        require: true
    },
    school_id:{
        type:Schema.Types.ObjectId,
        ref:"school"
    }
    },
{timestamps:true})


export const subject = mongoose.model("subject",subjectschema);
