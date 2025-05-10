import { admin } from "../model/admin.model.js"
import jwt from "jsonwebtoken"
import { student } from "../model/student.model.js"
import { teacher } from "../model/teacher.model.js"

export const admin_verifyJWT =async(req, _, next) => {
    try {
        const token = req.cookies?.admin_token 
       
        if (!token) {
            console.log(first)
            throw new Error("Unauthorized request")
        }
    
        const decodedToken =await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log( "token is ",decodedToken)
    
        const user = await admin.findById(decodedToken?._id) 
    
        if (!user) {
            
            throw new Error("Invalid access token1")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new Error("Invalid access token2")
    }
    
}


export const students_verifyJWT =async(req, _, next) => {
    try {
        const token = req.cookies?.s_token 
        
        // console.log(token);
        if (!token) {
            throw new Error("Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await student.findById(decodedToken?._id).select(
            "-password"
        )
    
        if (!user) {
            
            throw new Error("Invalid access token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new Error("Invalid access token")
    }
    
}


export const teacher_verifyJWT = async(req, _, next) => {
    try {
        const token = req.cookies?.t_token 
        
        // console.log(token);
        if (!token) {
            throw new Error("Invalid access token")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await teacher.findById(decodedToken?._id).select(
            "-password"
        )
        if (!user) {
            
            throw new Error("Invalid access token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new Error("Invalid access token")
    }
    
}