import { Router } from "express";
import { create_attendance, delete_attendance, get_attendence_by_date_and_class_id, update_attendance } from "../controller/attendance.controller.js";
export const attendacneRoute= Router();

attendacneRoute.post("/attendance",create_attendance)
attendacneRoute.put("/attendance",update_attendance)
attendacneRoute.get("/attendance-all-students",get_attendence_by_date_and_class_id);