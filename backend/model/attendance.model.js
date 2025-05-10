import mongoose, { Schema } from "mongoose";
const attendancescheam = new Schema({
  class_id: {
    type: Schema.Types.ObjectId,
    ref: "school_class",
  },
  school_id: {
    type: Schema.Types.ObjectId,
    ref: "school",
  },
  teacher_id: {
    type: Schema.Types.ObjectId,
    ref: "teacher",
  },
  student_id: {
    type: Schema.Types.ObjectId,
    ref: "student",



  },
  date: {

    type:Date,
    require:true,
  },
  status: {
    type: Boolean,
    default: false,
  },
},
{timestamps:true});
export const attendacne = mongoose.model("attendacne", attendancescheam);
