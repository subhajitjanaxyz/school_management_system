import { teacher } from "../model/teacher.model.js";
import { ApiResponse } from "../utils/apiRes.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";

//add teacher
export const teacherregister = async (req, res) => {
  const { fullname, email, password, age, school_id, gender, phone } = req.body;
//   console.log(fullname, email, password, age, school_id, gender, phone)
  if(

    [fullname, email, password, age, school_id, gender, phone].some((field) => field?.trim() === "")
){
    throw new Error("all feild require")

}
   const userexists= await teacher.findOne({email});
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
        const createuser= await teacher.create({
            fullname, email, password, age, school_id, gender, phone,avatar:avaterurl.url
        })


  res.send(createuser)
};
//login teacher
export const teacherlogin = async (req, res) => {
      
    const {email,password}=req.body;
    if(
        [email,password].some((field) => field?.trim() === "")
     ){
         throw new Error("all feild require")
     }
    
    const user= await teacher.findOne({email});
    if(!user){
        throw new Error("user not found")
    }
    
    
     const passwordis_c=await user.isPasswordCorrect(password);
     if(!passwordis_c){
        throw new Error("wrong password")
    }
    const t_token=  await user.generateAccessToken();
    console.log(t_token)
    
    //send req
    const options = {
        httpOnly: true,
        secure: true
    }
    
    return res
    .status(200)
    .cookie("t_token", t_token, options)
    .json(
        new ApiResponse(
            200, 
            {
                t_token
            },
            "User logged In Successfully"
        )
    )
    
    
};
//logout teacher
export const teacherlogout = async (req, res) => {
    //  console.log(req.user)
        const options = {
            httpOnly: true,
            secure: true
        }
    
        return res
        .status(200)
        .clearCookie("t_token", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
};

//update teacher
export const teacherupdate=async (req,res)=>{
    
         const {fullname, email, password, age, gender, phone }=req.body
        if(
    
            [fullname, email, age, gender, phone].some((field) => field?.trim() === "")
        ){
            throw new Error("all feild require")
    
        }
    
    
         const checkAvater= req.file?.path;
         
        const avaterurl= await uploadOnCloudinary(checkAvater)
    
        const user = await teacher.findById(req.user?._id);
          if(
        password
       ){
         user.password=password
       }
     
       user.fullname=fullname
       user.age=age
    //    user.school_id=school_id
       user.email=email
       user.gender=gender

       
       user.phone=phone
       if(
        avaterurl
       ){
          user.avatar=avaterurl.url
       }
    
     await user.save({validateBeforeSave: false});
     res.send("update");
       
}

export const teacherdelete= async(req,res)=>{
 const id= req.params.id;
    await teacher.findByIdAndDelete({_id:id})
    res.send("delete")
}