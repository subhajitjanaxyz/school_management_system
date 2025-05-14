import mongoose from "mongoose";
import { attendacne } from "../model/attendance.model.js";
import { ApiResponse } from "../utils/apiRes.js";

// create attendance
export const create_attendance = async (req, res) => {
  let { allstudents } = req.body;
  console.log(allstudents);
  allstudents.forEach((elements) => (elements.date = new Date(elements.date)));
  console.log(allstudents);
  let freashdata;
  for (let index = 0; index < allstudents.length; index++) {
    const element = allstudents[index];
    const alreadyexist = await attendacne.findOne({
      $and: [{ date: element.date }, { student_id: element.student_id }],
    });
    if (!alreadyexist) {
      freashdata = await attendacne.create({
        class_id: element.class_id,
        school_id: element.school_id,
        teacher_id: element.teacher_id,
        student_id: element.student_id,
        date: element.date,
        status: element.status,
      });
    }
  }

  console.log(freashdata);
  res.send("ok");
};
//update attendace for toggle attendane
export const update_attendance = async (req, res) => {
  const { id, status, date } = req.body;
  console.log(id, status, date);
  //   await attendacne.findByIdAndUpdate(id, { status });
  await attendacne.findOneAndUpdate({
    $and: [{ _id: id }, { date }],
  },
{
    status
});
  res.status(200).json(new ApiResponse(200, {}, "status update successfully"));
};
// delete attendance
export const delete_attendance = async (req, res) => {
  const id = req.params.id;
  await attendacne.findByIdAndDelete(id);
  res.status(200).json(new ApiResponse(200, {}, "delete successfull"));
};
export const students_attendance = async (req, res) => {};

//for teacher show all students to do attendance
export const get_attendence_by_date_and_class_id = async (req, res) => {
  const { class_id, date } = req.body;
  console.log(class_id, date);

  const attendacne_students = await attendacne.aggregate([
    {
      $match: {
        $and: [
          { class_id: new mongoose.Types.ObjectId(class_id) },
          { date: new Date(date) },
        ],
      },
    },
    {
      $lookup: {
        from: "students",
        localField: "student_id",
        foreignField: "_id",
        as: "student_id",
      },
    },
    {
      $unwind: "$student_id",
    },
    {
      $project: {
        "student_id.createdAt": 0,
        "student_id.updatedAt": 0,
        "student_id.password": 0,
      },
    },
  ]);
  res
    .status(200)
    .json(
      new ApiResponse(200, attendacne_students, "all students data is here...")
    );
};
