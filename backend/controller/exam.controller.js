import { exam } from "../model/exam.model.js";
import { ApiResponse } from "../utils/apiRes.js";

export const examcreate= async (req,res)=>{
    const school_id="681c969156a80dc0276be7f6";
    const {class_id,subject_id,date_time,duration}=req.body;
    
    if(
       [class_id,subject_id,date_time,duration].some((field) => field?.trim() === "")
    ){
        throw new Error("all feild require")
    }
    const exists_exam= await exam.findOne({subject_id});
    console.log(exists_exam)
    if(exists_exam){
        throw new Error("already created this exam");
    }
    const examcreate= await exam.create({
        class_id,subject_id,date_time: new Date(date_time),duration,school_id
    })
    res.status(200)
    .json(
        new ApiResponse(200,examcreate,"exam create successfully")
    )




}

export const examupdate= async (req,res)=>{
    const {class_id,subject_id,date_time,duration,id}=req.body;
     if(
       [class_id,subject_id,date_time,duration,id].some((field) => field?.trim() === "")
    ){
        throw new Error("all feild require")
    }
  const  new_exam =  await exam.findByIdAndUpdate(id,{
                             class_id,subject_id,date_time,duration
                                 },
{
    new:true,runvalidators:true
})

res.status(200)
.json(
    new ApiResponse(200,new_exam,"add new exam routing")
)



}

export const examdel= async (req,res)=>{
    const id= req.params.id
    await exam.findByIdAndDelete(id)
    res.status(200)
    .json(
        new ApiResponse(200,{},"exam delete")
    )

}

export const examdetails= async (req,res)=>{
    const {class_id}=req.body// class id come from requset.user
    const exam_details=await exam.find({class_id});
    res.status(200)
    .json(
        new ApiResponse(200,exam_details,"all exam details")
    )

}

