import { student } from "../model/student.model.js";
import { ApiResponse } from "../utils/apiRes.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";



// add student
export const studentregister=async (req,res)=>{
    const {school_id,class_id,fullname,student_email,password,phone}=req.body
    if(

        [school_id,class_id,fullname,student_email,password,phone].some((field) => field?.trim() === "")
    ){
        throw new Error("all feild require")

    }


        const userexists= await student.findOne({student_email});
        if(userexists){
            throw new Error ("user already exists")
        }
        
        const checkAvater= req.file.path;
        if(!checkAvater){
            throw new Error("file path not valid")
        }
        const avaterurl= await uploadOnCloudinary(checkAvater)
        if(!avaterurl){
            throw new Error("file url not valid")
        }
        const createuser= await student.create({
            school_id,class_id,fullname,student_email,password,phone,avatar:avaterurl.url
        })


  res.send(createuser)
}

//login student
export const studentlogin= async(req,res)=>{
    
const {student_email,password}=req.body;
if(
    [student_email,password].some((field) => field?.trim() === "")
 ){
     throw new Error("all feild require")
 }

const user= await student.findOne({student_email});
if(!user){
    throw new Error("user not found")
}


 const passwordis_c=await user.isPasswordCorrect(password);
 if(!passwordis_c){
    throw new Error("wrong password")
}
const s_token=  await user.generateAccessToken();
console.log(s_token)

//send req
const options = {
    httpOnly: true,
    secure: true
}

return res
.status(200)
.cookie("s_token", s_token, options)
.json(
    new ApiResponse(
        200, 
        {
            s_token
        },
        "User logged In Successfully"
    )
)


}

//logout students
export const studentlogout = async (req,res)=>{
    console.log(req.user)
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("s_token", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
}


//update students details
export const studentupdate = async(req,res)=>{
     const {class_id,fullname,student_email,password,phone}=req.body
    if(

        [class_id,fullname,student_email,phone].some((field) => field?.trim() === "")
    ){
        throw new Error("all feild require")

    }


     const checkAvater= req.file?.path;
     
    const avaterurl= await uploadOnCloudinary(checkAvater)

    const user = await student.findById(req.user?._id);
      if(
    password
   ){
     user.password=password
   }

   user.class_id=class_id
   user.fullname=fullname
   user.student_email=student_email
   
   user.phone=phone
   if(
    avaterurl
   ){
      user.avatar=avaterurl.url
   }

 await user.save({validateBeforeSave: false});
 res.send("update");
   
}
//delete studetns id
export const studentdelete= async (req,res)=>{
    const id= req.params.id;
    await student.findByIdAndDelete({_id:id})
    res.send("ok")

}