import mongoose ,{Schema} from "mongoose";
const assingattendenceSchema=new Schema({
    school_id:{
    type:Schema.Types.ObjectId,
    ref:"school"
    },
    teacher_id:{
        type:Schema.Types.ObjectId,
        ref:"teacher"
    },
    class_id:{  
        type:Schema.Types.ObjectId,
        ref:"school_class"

    },
    date: {
        type: Date,
        require:true
    },
    status:{
    type: Boolean,
    default: false,

    }

},
{timestamps:true})

export const at_attendence=mongoose.model("at_attendence",assingattendenceSchema);