import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { adminroute } from "./routes/admin.route.js"
import { studentroute } from "./routes/student.route.js"
import { teacherroute } from "./routes/teacher.route.js"
import { classroute } from "./routes/class.route.js"
import { subjectroute } from "./routes/subject.route.js"
import { noitceroute } from "./routes/notice.route.js"
import { examrouter } from "./routes/exam.routes.js"

export const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//route 
app.use("/api",adminroute)
app.use("/api",studentroute)
app.use("/api",teacherroute)
app.use("/api",classroute)
app.use("/api",subjectroute)
app.use("/api",noitceroute)
app.use("/api",examrouter)
