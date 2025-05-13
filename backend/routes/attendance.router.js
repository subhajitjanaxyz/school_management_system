import { Router } from "express";
import { create_attendance, delete_attendance, update_attendance } from "../controller/attendance.controller.js";
export const attendacneRoute= Router();

attendacneRoute.post("/attendance",create_attendance)
attendacneRoute.put("/attendance",update_attendance)
attendacneRoute.delete("/attendance",delete_attendance)