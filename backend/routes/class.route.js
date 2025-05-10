import { Router } from "express";
import { classregister, classdelete, classupdate, allclass } from "../controller/class.controller.js";
import { upload } from "../middleware/multer.middleware.js";
// import { classes_verifyJWT } from "../middleware/auth.middle.js";

export const classroute = Router();

classroute.post("/class", upload.none(), classregister);
classroute.put("/class", upload.none(), classupdate);
classroute.delete("/class/:id", classdelete);
classroute.get("/class", allclass);
