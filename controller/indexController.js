const formModel = require("../models/indexModel");

exports.home = async (req, res, next) => {
  try {
    res.status(200).json({ message: "This is Home Route" });
  } catch (error) {
    res.json(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, uri, type } = req.body;
    const file = req.file;
    const files = req.files;
    console.log(file, files);

    // const modified = `resumebulder-${Date.now()}${path.extname(file.name)}`;

    // if (student.avatar.fileId !== "") {
    //   await imagekit.deleteFile(student.avatar.fileId);
    // }

    // const { fileId, url } = await imagekit.upload({
    //   file: file.data,
    //   fileName: modified,
    // });

    // student.avatar = { fileId, url };
    // await student.save();
    res.json({ message: "Form Submitted Successfully!", file, files });
  } catch (error) {
    res.json(error.message);
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
