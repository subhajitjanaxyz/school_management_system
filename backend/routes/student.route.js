import{Router} from "express";
import { studentdelete, studentlogin, studentlogout, studentregister, studentupdate } from "../controller/students.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { students_verifyJWT } from "../middleware/auth.middle.js";

export const studentroute=Router();

studentroute.post("/student/register",upload.single('avatar'), studentregister);
studentroute.post("/student/login",studentlogin);
studentroute.post("/student/logout",students_verifyJWT,studentlogout);
studentroute.put("/student/update",upload.single('avatar'),students_verifyJWT,studentupdate);
studentroute.delete("/student/delete/:id",studentdelete);