import mongoose,{Schema} from "mongoose";
const examSchema=new Schema({
    school_id:{
        type:Schema.Types.ObjectId,
        ref:"school"
    },
    class_id:{
        type:Schema.Types.ObjectId,
        ref:"school_class"
    },
    subject_id:{
        type:Schema.Types.ObjectId,
        ref:"subject"
    },
    date:{
        type:Date,
        require:true
    },
    time:{
        type:String,
        require:true
    },
    duration:{
        type:String,
        require:true
    }
})
export const exam = mongoose.model("exam",examSchema);