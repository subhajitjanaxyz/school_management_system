import { Router } from "express";
import { allsubject, subjectdelete, subjectregister, subjectupdate } from "../controller/subject.controller.js";
import { upload } from "../middleware/multer.middleware.js";

export const subjectroute= Router();

subjectroute.post('/subject',upload.none(),subjectregister)
subjectroute.put('/subject',upload.none(),subjectupdate)
subjectroute.delete('/subject/:id',subjectdelete)
subjectroute.get('/subject',allsubject)