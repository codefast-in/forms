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
    const { name } = req.body;
    const file = req.file;
    const modified = file.originalname;
    console.log(modified);

    const { fileId, url } = await imagekit.upload({
      file: file.buffer,
      fileName: modified,
    });

    res.json({ message: "Form Submitted Successfully!", name, url, fileId });
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
