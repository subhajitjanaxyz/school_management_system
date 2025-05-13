import { Router } from "express";
export const assingtoattendenceroute = Router();
import { assign_to_attendence, delete_assign_to_attendence, get_all_assign_to_attendence_admin, onlyteacher, update_assign_to_attendence } from "../controller/assing_to_attendence.controller.js";
import { upload } from "../middleware/multer.middleware.js";    


//create doc
assingtoattendenceroute.post("/ats", upload.none(), assign_to_attendence);
//update doc
assingtoattendenceroute.put("/ats", upload.none(), update_assign_to_attendence);
//delete doc
assingtoattendenceroute.delete("/ats/:id", delete_assign_to_attendence);   
//get all doc
// assingtoattendenceroute.get("/ats_all", get_all_assign_to_attendence);   
//get teacher doc
assingtoattendenceroute.get("/ats-teacher",upload.none(), onlyteacher);
assingtoattendenceroute.get("/ats-admin",upload.none(), get_all_assign_to_attendence_admin);

