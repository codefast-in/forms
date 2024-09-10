const formModel = require("../models/indexModel");
const imagekit = require("../utils/imageKit.js").initImageKit();
const documentModel = require("../models/documentModel.js");
const academicModel = require("../models/academicModel.js");
exports.home = async (req, res, next) => {
  try {
    res.status(200).json({ message: "This is Home Route" });
  } catch (error) {
    res.json(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, email, contact, dob } = req.body;
    const file = req.file;
    const modified = Date.now() + file.originalname;
    const { fileId, url } = await imagekit.upload({
      file: file.buffer,
      fileName: modified,
    });
    const reqData = {
      ...req.body,
      createdBy: req.id,
      image: { fileId: fileId, url },
    };
    const responseData = await formModel(reqData).save();

    res.json({ message: "Form Submitted Successfully!" });
  } catch (error) {
    res.json(error);
  }
};

exports.findOne = async (req, res, next) => {
  const user = await formModel
    .findById(req.params.userid)
    .populate([
      { path: "updatedBy", select: "" },
      { path: "createdBy", select: "" },
      { path: "documents", select: "" },
      { path: "academic", select: "" },
    ])
    .exec();
  if (!user) {
    res.status(500).json({ message: "User Not Found!" });
    return;
  }
  res.status(200).json(user);
};

exports.deleteUser = async (req, res, next) => {
  const user = await formModel.findByIdAndDelete(req.params.userid).exec();
  if (!user) {
    res.status(500).json({ message: "User Not Found!" });
    return;
  }
  await imagekit.deleteFile(user.image.fileId);

  res.status(201).json({ message: "User Deleted Successfully!" });
};

exports.updateUser = async (req, res, next) => {
 try {
  const data = req.body;
  const file = req.file;
  const user = await formModel.findById(req.params.userid).exec();
  if (!user) {
    res.status(500).json({ message: "User Not Found!" });
    return;
  }
  
  if(file){
    await imagekit.deleteFile(user.image.fileId);  
    
    const modified = Date.now() + file.originalname;
    const { fileId, url } = await imagekit.upload({
      file: file.buffer,
      fileName: modified,
    });
    user.image = { fileId: fileId, url: url };
    
  }
  user.updatedBy = req.id;
  user.name = req.body.name;
  user.email = req.body.email;
  user.contact = req.body.contact;
  user.dob = req.body.dob;
  user.gender = req.body.gender;
  await user.save();
  res.status(201).json({ message: "User Update Successfully!" });
 } catch (error) {
    console.log(error)
 }
};

exports.uploadDocument = async (req, res, next) => {
  const file = req.file;
  const { title } = req.body;
  const modified = Date.now() + file.originalname;
  const { fileId, url } = await imagekit.upload({
    file: file.buffer,
    fileName: modified,
  });

  const reqData = {
    personalDocument: { fileId: fileId, url: url, title: title },
  };
  const doc = await documentModel(reqData).save();
  const user = await formModel.findById(req.params.userId).exec();
  if (!user) {
    return res.json({ message: "User Not Found!" });
  }
  await user.documents.push(doc._id);
  await user.save();
  res.status(200).json({ message: "Document Upload Successfully!", title});
};

exports.uploadAcademicDetails = async (req, res, next) => {
  const { body } = req;
  const academic = await academicModel(body).save();
  const user = await formModel.findById(req.params.userId).exec();
  if (!user) {
    return res.status(500).json({ message: "User Not Found" });
  }
  await user.academic.push(academic._id);
  await user.save();
  res
    .status(200)
    .json({ message: "Document Upload Successfully!", academic, user });
};

exports.read = async (req, res, next) => {
  try {
    const data = await formModel.find().populate([
      { path: "updatedBy", select: "" },
      { path: "createdBy", select: "" },
      { path: "documents", select: "" },
      { path: "academic", select: "" },
    ]);
    res.status(200).json({ meaage: "Rad All Data", data });
  } catch (error) {
    res.json(error.message);
  }
};
