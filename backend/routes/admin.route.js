import{Router} from "express";
import { adminlogin, adminlogout, adminregister, adminupdate } from "../controller/admin.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { admin_verifyJWT } from "../middleware/auth.middle.js";

export const adminroute=Router();

adminroute.post("/admin/register",upload.none(),adminregister);
adminroute.post("/admin/login",upload.none(),adminlogin);
adminroute.post("/admin/logout",admin_verifyJWT,adminlogout);
adminroute.post("/admin/update",upload.none(),admin_verifyJWT,adminupdate);