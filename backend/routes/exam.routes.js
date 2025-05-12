import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { examcreate, examdel, examdetails, examupdate } from "../controller/exam.controller.js";
export const examrouter= Router();

examrouter.post("/exam",upload.none(),examcreate);
examrouter.put("/exam",upload.none(),examupdate);
examrouter.delete("/exam/:id",examdel);
examrouter.get("/exam",upload.none(),examdetails);