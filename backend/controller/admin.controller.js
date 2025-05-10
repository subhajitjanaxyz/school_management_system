import { admin } from "../model/admin.model.js";
import { ApiResponse } from "../utils/apiRes.js";
export const adminregister=async (req,res)=>{

    const {fullname,email,password,school_id}=req.body;
    // console.log(fullname,email,password,school_id)
    //check fields are empry ?
    if(
       [fullname,email,password,school_id].some((field) => field?.trim() === "")
    ){
        throw new Error("all feild require")
    }
    //check user is already exists ?
    const userexists= await admin.findOne({email});
    if(userexists){
        throw new Error ("user already exists")
    }

    //create new doc
  const crateuser= await admin.create({

    fullname,email,password,school_id

  }
  )    
  console.log(crateuser)
res.send(crateuser)
}
export const adminlogin= async(req,res)=>{
const {email,password}=req.body;
if(
    [email,password].some((field) => field?.trim() === "")
 ){
     throw new Error("all feild require")
 }

const user= await admin.findOne({email});
if(!user){
    throw new Error("user not found")
}


 const passwordis_c=await user.isPasswordCorrect(password);
 if(!passwordis_c){
    throw new Error("wrong password")
}
const admin_token=  await user.generateAccessToken();
console.log(admin_token)

//send req
const options = {
    httpOnly: true,
    secure: true
}

return res
.status(200)
.cookie("admin_token", admin_token, options)
.json(
    new ApiResponse(
        200, 
        {
            admin_token
        },
        "User logged In Successfully"
    )
)


}





export const adminlogout = async (req,res)=>{
    console.log(req.user)


    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("admin_token", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
}




//admin update
export const adminupdate = async(req,res)=>{
    const {fullname,email,password}=req.body

    

    const user = await admin.findById(req.user?._id);
    user.fullname=fullname;
    user.email=email;
    user.password=password;
   await user.save({validateBeforeSave: false})

 

    res.send("u")


}
export const admindelete= async (req,res)=>{
    const id=req.params.id;
    

}