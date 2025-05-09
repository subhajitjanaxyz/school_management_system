import{Router} from "express";
import { upload } from "../middleware/multer.middleware.js";
import {  teacher_verifyJWT } from "../middleware/auth.middle.js";
import { teacherdelete, teacherlogin, teacherlogout, teacherregister, teacherupdate } from "../controller/teacher.controller.js";

export const teacherroute=Router();

teacherroute.post("/teacher/register",upload.single('avatar'), teacherregister);
teacherroute.put("/teacher/update",upload.single('avatar'),teacher_verifyJWT, teacherupdate);
teacherroute.post("/teacher/login",teacherlogin);
teacherroute.delete("/teacher/delete/:id",teacherdelete);
teacherroute.post("/teacher/logout",teacher_verifyJWT,teacherlogout);






