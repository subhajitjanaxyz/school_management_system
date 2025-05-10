import mongoose ,{Schema} from "mongoose";
const assingattendenceSchema=new Schema({
    school_id:{
        
    },
    teacher_id:{

    },
    class_id:{

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