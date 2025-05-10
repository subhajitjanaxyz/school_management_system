import { school_class } from "../model/class.model.js"
import { ApiResponse } from "../utils/apiRes.js"

export const classregister = async (req,res)=>{
const {school_id,cname,ccode}= req.body
if(

[school_id,cname,ccode].some((elements)=> elements?.trim("")==="")

){
    throw new Error (" all fields are require ")
}

const alreadyexist=  await school_class.findOne({
    $or :[{cname},{ccode}]
})
if(alreadyexist){
    throw new Error("all ready exists")
}
const school_doc=await school_class.create({
school_id,cname,ccode
})

res.send("school_doc");

}

export const classupdate=async (req,res)=>{
    const  {id,newcname,newccode}= req.body;
    
    console.log(id,newcname,newccode)
    if([newcname,newccode].some((elements)=> elements?.trim()==="")){
        throw new Error (" all fields are require")
    }
    
    const user= await school_class.findById(id);
    user.ccode=newccode;
    user.cname= newcname;
   await user.save({validateBeforeSave: false});
   return res.status(200)
   .json(
    new ApiResponse(200, {}, "class is updates")
   )

}   

export const  classdelete=async (req,res)=>{
    const id=req.params.id
    await school_class.findByIdAndDelete(id);
    res.status(200)
    .json(
        new ApiResponse(200,{},"calss delete succesfull")
    )
}
export const allclass= async(req,res)=>{
const data=await school_class.find({school_id:"681c969156a80dc0276be7f6"});
res.status(200)
.json(
    new ApiResponse(200,{data}," succesfull")
)
}