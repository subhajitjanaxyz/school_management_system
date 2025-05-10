import { subjectmodel } from "../model/subhject.model.js";
import { ApiResponse } from "../utils/apiRes.js";


//add subject
export const subjectregister= async (req,res)=>{
const {school_id,code,subject}=req.body;
if(
[school_id,code,subject].some((elements)=> elements?.trim()==="")
){
    throw new Error ("all fields are require")
}


const user= await  subjectmodel.create({
    school_id,code,subject
})

res.status(200)
.json(

    new ApiResponse(201,user,"subject created successfully")
)

}


// edit subject
export const subjectupdate = async(req,res)=>{
    const {id,newcode,newsubject} = req.body;
    if(
        [id,newcode,newsubject].some((elements)=> elements?.trim()==="")
    ){
        throw new Error("all fields are require")
    }
    const subjectdocumetns= await subjectmodel.findById(id);
    if(!subjectdocumetns){
        throw new Error("subject not founds")
    }
    subjectdocumetns.code=newcode;
    subjectdocumetns.subject=newsubject;
    await subjectdocumetns.save({validateBeforeSave: false});
    res.status(200)
    .json(
        new ApiResponse (200,{},"subject update successfully")
    )
}


//delte subject
export const subjectdelete = async (req,res)=>{
    const id= req.params.id
    await subjectmodel.findByIdAndDelete(id)

  res.status(200)
    .json(
        new ApiResponse (200,{},"subject update successfully")
    )
}

//get all subject
export const allsubject = async (req,res)=>{
    const data= await subjectmodel.find();
    res.status(200)
    .json(
        new ApiResponse (200,data,"all subject is here.")
    )
}