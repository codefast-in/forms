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
    const reqData = { ...req.body, image: { fileId: fileId, url } };
    const responseData = await formModel(reqData).save();
    res.json({ message: "Form Submitted Successfully!" });
  } catch (error) {
    res.json(error);
  }
};

exports.read = async (req, res, next) => {
  try {
    const data = await formModel.find();
    res.status(200).json({ meaage: "Rad All Data", data });
  } catch (error) {
    res.json(error.message);
  }
};
