// import model
import mongoose from "mongoose";
import { at_attendence } from "../model/assing_to_attendence.model.js";
import { ApiResponse } from "../utils/apiRes.js";
// import response
// import { ApiResponse } from "../utils/apiResponse.js";
//assign to attendence
export const assign_to_attendence = async (req, res) => {
  const { school_id, teacher_id, class_id, date } = req.body;
  if (
    [school_id, teacher_id, class_id, date].some(
      (elements) => elements?.trim("") === ""
    )
  ) {
    throw new Error(" all fields are require ");
  }
  const exists = await at_attendence.findOne({
    $and: [{ teacher_id }, { class_id }, { date: new Date(date) }],
  });
  if (exists) {
    throw new Error("already exists");
  }
  const assign = await at_attendence.create({
    school_id,
    teacher_id,
    class_id,
    date: new Date(date),
  });
  res
    .status(200)
    .json(new ApiResponse(200, assign, "assign to attendence successfully"));
};

// update assign to attendence
export const update_assign_to_attendence = async (req, res) => {
  const { id, teacher_id, class_id, date } = req.body;
  if (
    [id, teacher_id, class_id, date].some(
      (elements) => elements?.trim("") === ""
    )
  ) {
    throw new Error(" all fields are require ");
  }
  const exists = await at_attendence.findById(id);
  if (!exists) {
    throw new Error("not found");
  }
  exists.teacher_id = teacher_id;
  exists.class_id = class_id;
  exists.date = new Date(date);
  await exists.save({ validateBeforeSave: false });
  res
    .status(200)
    .json(new ApiResponse(200, {}, "update assign to attendence successfully"));
};

//  delete assign to attendence
export const delete_assign_to_attendence = async (req, res) => {
  const id = req.params.id;
  await at_attendence.findByIdAndDelete(id);
  res
    .status(200)
    .json(new ApiResponse(200, {}, "delete assign to attendence successfully"));
};

// // get all assign to attendence
// export const get_all_assign_to_attendence = async (req, res) => {
//     const date= new Date();
//     const { teacher_id } = req.body;
//     if ([teacher_id,date].some((elements) => elements?.trim("") === "")) {
//         throw new Error(" all fields are require ");
//     }
//     const data = await at_attendence.find({
// $and: [
//         { teacher_id },
//         { date: { $gte: new Date(date) } }
//     ]
//     });
//     res.status(200)
//         .json(
//             new ApiResponse(200, { data }, "get all assign to attendence successfully")
//         )
// }

export const onlyteacher = async (req, res) => {
  //teacher_id its come from token

  const { teacher_id, class_id, date } = req.body;
  if ([teacher_id, class_id].some((elements) => elements?.trim("") === "")) {
    throw new Error(" all fields are require ");
  }
  const data = await at_attendence.aggregate([
    {
      $match: {
        $and: [
          { teacher_id: new mongoose.Types.ObjectId(teacher_id) },
          { class_id:new mongoose.Types.ObjectId(class_id) },
          { date: new Date(date) }
        ],
      },
    },
    {
        $lookup: {
            from: "students",
            localField: "class_id",
            foreignField: "class_id",
            as: "class_id"
        }
    },
    {
      $lookup: {
        from:"teachers",
            localField: "teacher_id",
            foreignField: "_id",
            as: "teacher_id"}
    },
    {
        $unwind: "$teacher_id"
    }
    
   
  ]);

  res.status(200).json(new ApiResponse(200, data, "data fetch successfully"));
};


export const get_all_assign_to_attendence_admin =    async (req, res) => {
    const { class_id, date } = req.body;
    if ([class_id, date].some((elements) => elements?.trim("") === "")) {
        throw new Error(" all fields are require ");
    }
    // const data = await at_attendence.find({
    //     $and: [
    //         { class_id: new mongoose.Types.ObjectId(class_id) },
    //         { date: new Date(date) }
    //     ],
    // })

    const data = await at_attendence.aggregate([
        {
            $match: {
                $and: [
                    { class_id: new mongoose.Types.ObjectId(class_id) },
                    { date: new Date(date) }
                ],
            },
        },
        {
            $lookup: {
                from: "school_classes",
                localField: "class_id",
                foreignField: "_id",
                as: "class_id"
            }
        },
        {
            $lookup: {
                from:"teachers",
                    localField: "teacher_id",
                    foreignField: "_id",
                    as: "teacher_id"}
        },
        {
            $unwind: "$teacher_id",
           
        },
        {
             $unwind: "$class_id"
        }
    ]);
    res
        .status(200)
        .json(new ApiResponse(200, data, "get all assign to attendence"));
}