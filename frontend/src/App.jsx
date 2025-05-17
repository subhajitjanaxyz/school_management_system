import { useState } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Admin } from "./components/admin/Admin";
import { Dashbord } from "./components/admin/Dashbord";
import { SchoolClass } from "./components/admin/SchoolClass";
import { Subject } from "./components/admin/Subject";
import { Student } from "./components/admin/Student";
import { Teacher } from "./components/admin/Teacher";
import { Schedule } from "./components/admin/Schedule";
import { Attendance } from "./components/admin/Attendance";
import { Exam } from "./components/admin/Exam";
import { Notice } from "./components/admin/Notice";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Profile } from "./components/Profile";
import { TeacherShedule } from "./components/teacher/TeacherShedule";
import { TeacherAttendance } from "./components/teacher/TeacherAttendance";
import { TeacherExam } from "./components/teacher/TeacherExam";
import { TeacherNotice } from "./components/teacher/TeacherNotice";
import { StudentShedule } from "./components/student/StudentShedule";
import { StudentAttendance } from "./components/student/StudentAttendance";
import { StudentExam } from "./components/student/StudentExam";
import { StudentNotice } from "./components/student/StudentNotice";
import {Login} from "./components/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "/admin",
        element: <Dashbord />,
      },
      {
        path: "/admin/class",
        element: <SchoolClass />,
      },
      {
        path: "/admin/subject",
        element: <Subject />,
      },
      {
        path: "/admin/student",
        element: <Student />,
      },
      {
        path: "/admin/teacher",
        element: <Teacher />,
      },
      {
        path: "/admin/schedule",
        element: <Schedule />,
      },
      {
        path: "/admin/attendance",
        element: <Attendance />,
      },
      {
        path: "/admin/exam",
        element: <Exam />,
      },
      {
        path: "/admin/notice",
        element: <Notice />,
      },
    ],
  },
  {
    path: "/teacher",
    element: <Teacher />,
    children: [
      {
        path: "/teacher",
        element: <Profile />,
      },
      {
        path: "/teacher/shedule",
        element: <TeacherShedule />,
      },
      {
        path: "/teacher/attendance",
        element: <TeacherAttendance />,
      },
      {
        path: "/teacher/exam",
        element: <TeacherExam />,
      },
      {
        path: "/teacher/notice",
        element: <TeacherNotice />,
      },
    ],
  },
  {
    path: "/student",
    element: <Student />,
    children: [
      {
        path: "/student",
        element: <Profile />,
      },
      {
        path: "/student/shedule",
        element: <StudentShedule />,
      },
      {
        path: "/student/attendance",
        element: <StudentAttendance />,
      },
      { path: "/student/exam", element: <StudentExam /> },
      {
        path: "/student/notice",
        element: <StudentNotice />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  }
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
