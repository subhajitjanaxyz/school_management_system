import { notice } from "../model/notice.model.js";
import { ApiResponse } from "../utils/apiRes.js";

///notice resgister
export const noticeregiter = async (req, res) => {
  const school_id = "681c969156a80dc0276be7f6";
  const { title, description, date, class_id, audience } = req.body;

  if (
    [title, description, date, audience].some(
      (elements) => elements?.trim("") === ""
    )
  ) {
    throw new Error(" all fields are require ");
  }
  const noticecreate = await notice.create({
    school_id,
    title,
    description,
    date: new Date(date),
    class_id,
    audience,
  });

  // notice.date instanceof Date

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Notice created Successfully"));
};

//notice update
export const updatenotice = async (req, res) => {
  const { title, description, class_id, audience, id } = req.body;

  if(

  [title,description,audience,id].some((elements)=> elements?.trim("")==="")

  ){
      throw new Error (" all fields are require ")
  }
  const existsnoitce= await notice.findById(id);
  if(
      !existsnoitce
  ){
          throw new Error (" notice is not exists ")

  }

  existsnoitce.title= title;
  existsnoitce.description=description;
  existsnoitce.audience=audience;
  if(class_id){
      existsnoitce.class_id=class_id;
  }

  await existsnoitce.save();

  res.status(200).json(new ApiResponse(200, {}, "notice update successfully"));
};

//notice delete
export const deletnotice = async (req, res) => {
  const id = req.params.id;
  await notice.findByIdAndDelete(id);
  res.status(200).json(new ApiResponse(200, {}, "notice delete succfully"));
};

//all noitce
export const allNotice = async (req, res) => {
  const allnotice = await notice.find();
  res.status(200).json(new ApiResponse(200, allnotice, "all noitce data "));
};

//teacher noitce
export const teachernotice = async (req, res) => {
  const teachernotice = await notice.find({ audience: "teacher" });

  res
    .status(200)
    .json(new ApiResponse(200, teachernotice, "teacher noitce successfully"));
};
// students notice
export const studentsbyclass = async (req, res) => {
  const { class_id } = req.body;

  console.log(class_id)
  if (!class_id) {
    throw new Error("fields is empty");
  }

  const noticedata = await notice.find({
    $and: [{ class_id }, { audience: "students" }],
  });




  res
    .status(200)
    .json(new ApiResponse(200, noticedata, "successfully all data fetch"));
};
