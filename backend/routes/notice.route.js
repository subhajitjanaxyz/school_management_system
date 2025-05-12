import { Router } from "express";
import { allNotice, deletnotice, noticeregiter, studentsbyclass, teachernotice, updatenotice } from "../controller/notice.controller.js";
import { upload } from "../middleware/multer.middleware.js";
export const noitceroute= Router();

//crud
noitceroute.post('/notice',upload.none(),noticeregiter)
noitceroute.put('/notice',upload.none(),updatenotice)
noitceroute.delete('/notice/:id',deletnotice)


noitceroute.get('/allnotice',allNotice)
noitceroute.get('/teachernotice',teachernotice)
noitceroute.get('/studentsnotice',upload.none(),studentsbyclass)