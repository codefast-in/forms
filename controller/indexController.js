const formModel = require("../models/indexModel");
const imagekit = require("../utils/imageKit.js").initImageKit();

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
  const user = await formModel.findById(req.params.userid).exec();
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
  const data = req.body;
  const file = req.file;
  const user = await formModel.findById(req.params.userid).exec();
  if (!user) {
    res.status(500).json({ message: "User Not Found!" });
    return;
  }
  await imagekit.deleteFile(user.image.fileId);

  const modified = Date.now() + file.originalname;
  const { fileId, url } = await imagekit.upload({
    file: file.buffer,
    fileName: modified,
  });
  user.updatedBy = req.id;
  user.image = { fileId: fileId, url: url };
  user.name = req.body.name;
  user.email = req.body.email;
  user.contact = req.body.contact;
  user.dob = req.body.dob;
  await user.save();
  res.status(201).json({ message: "User Update Successfully!" });
};

exports.read = async (req, res, next) => {
  try {
    const data = await formModel.find();
    res.status(200).json({ meaage: "Rad All Data", data });
  } catch (error) {
    res.json(error.message);
  }
};
