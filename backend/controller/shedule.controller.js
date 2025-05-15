import mongoose from "mongoose";
import { shedule } from "../model/shedule.model.js";
import { ApiResponse } from "../utils/apiRes.js";

//create schedule
export const add_schedule = async (req, res) => {
  const { school_id, start, end, class_id, teacher_id, subject_id } =
    req.body;
    console.log(school_id, start, end, class_id, teacher_id, subject_id);
    if (
      [school_id, start, end, class_id, teacher_id, subject_id].some(
        (elements) => elements?.trim("") === ""
      )
    ) {
        throw new Error(" all fields are require ");
    }
    const exists = await shedule.findOne({
        $and: [
            { school_id: school_id },
            { start: new Date(start) },
            { end: new Date(end) },
            { class_id: class_id },
            { teacher_id: teacher_id },
            { subject_id: subject_id },
        ],
    });
    if (exists) {
        throw new Error("already exists");
    }
    const schedule_doc = await shedule.create({
        school_id,
        start: new Date(start),
        end: new Date(end),
        class_id,
        teacher_id,
        subject_id,
        });
    res.status(200).json(new ApiResponse(200, schedule_doc, "schedule added"));
}

//delete schedule
export const delete_schedule = async (req, res) => {
    const id = req.params.id;
    await shedule.findByIdAndDelete(id);
    res.status(200).json(new ApiResponse(200, {}, "delete successfull"));
}
//update schedule
export const update_schedule = async (req, res) => {
    const { id, teacher_id, subject_id } =
      req.body;
      if (
        [id, teacher_id, subject_id ].some(
          (elements) => elements?.trim("") === ""
        )       

        ) {     
            throw new Error(" all fields are require ");
        };
        const exists = await shedule
        .findOne({
            $and: [
                { _id: id }
            ],
        },

    );
        if (!exists) {
            throw new Error("not found");
        }
   const data=await shedule.findByIdAndUpdate(
        id,
        {
           
            teacher_id,
            subject_id,
        },
        { new: true }
    );
    res.status(200).json(new ApiResponse(200, data, "schedule updated"));
}


//get schedule by class id
export const get_schedule_by_class_id = async (req, res) => {
    const { class_id } = req.body;
    console.log(class_id);
    const schedule = await shedule.aggregate([
        {
            $match: {
                class_id: new mongoose.Types.ObjectId(class_id),
            },
        },
        {
            $lookup: {
                from: "school_classes",
                localField: "class_id",
                foreignField: "_id",
                as: "class_id",
            },
        },
        {
            $lookup: {
                from: "teachers",
                localField: "teacher_id",
                foreignField: "_id",
                as: "teacher_id",
            },
        },
        {
            $lookup: {
                from: "subjects",
                localField: "subject_id",
                foreignField: "_id",
                as: "subject_id",
            },
        },
    ]);
    res.status(200).json(new ApiResponse(200, schedule, "all schedule data is here..."));   
}
