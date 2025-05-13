api
admin register  && login && logout

<!-- school_id come from req.user (admin) -->


# replace other documents _id => full documents with new fields;




<!-- import { exam } from "../models/exam.model.js";
import mongoose from "mongoose";

export const getExamsByClass = async (req, res) => {
  try {
    const { class_id } = req.params;

    const exams = await exam.aggregate([
      {
        $match: {
          class_id: new mongoose.Types.ObjectId(class_id),
        },
      },
      {
        $lookup: {
          from: "schools",
          localField: "school_id",
          foreignField: "_id",
          as: "school",
        },
      },
      {         
        $lookup: {
          from: "subjects",
          localField: "subject_id",
          foreignField: "_id",
          as: "subject",
        },
      },
      {
        $lookup: {
          from: "school_classes",
          localField: "class_id",
          foreignField: "_id",
          as: "class",
        },
      },
      {
        $unwind: {
          path: "$school",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$subject",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$class",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          date_time: 1,
          duration: 1,
          "school.name": 1,
          "subject.name": 1,
          "class.name": 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: exams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch exams",
      error: error.message,
    });
  }
}; -->