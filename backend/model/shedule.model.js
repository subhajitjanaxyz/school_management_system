import mongoose from "mongoose";
const sheduleSchema= new mongoose.Schema({
    
    school_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "school",
        required: true
    },
    start:{
        type:Date,
        require: true
    },
    end: {
        type:Date,
        require: true
    },
    class_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"school_class"
    },
    teacher_id:{
          type:mongoose.Schema.Types.ObjectId,
        ref:"teacher"
    },
    subject_id:{
          type:mongoose.Schema.Types.ObjectId,
        ref:"subject"
    }




},
{timestamps:true}
)

export const shedule = mongoose.model("shedule", sheduleSchema);