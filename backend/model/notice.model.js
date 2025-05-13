import mongoose,{Schema} from "mongoose";
const noticeschema= new Schema({
    school_id:{
        type:Schema.Types.ObjectId,
        ref:"school"
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        // default:Date.now()
    },
    class_id:{
        type:Schema.Types.ObjectId,
        ref:"school_class"
    },
    audience:{
        type:String,
        require:true,
        enum:["students","teacher","everyone"]
        
    }
    
},
{timestamps:true})      

export const notice = mongoose.model("notice",noticeschema);