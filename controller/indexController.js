const formModel = require("../models/indexModel");
// const Grid = require("gridfs-stream");

// let gfs;
// mongoose.connection.once("open", () => {
//   gfs = Grid(mongoose.connection.db, mongoose.mongo);
//   gfs.collection("uploads");
// });

exports.home = async (req, res, next) => {
  try {
    res.status(200).json({ message: "This is Home Route" });
  } catch (error) {
    res.json(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body || "nahi hai");
    if (!req.file) {
      console.error("No file uploaded.");
      return res.status(400).json("No files were uploaded.");
    }

    const fil = req.file;
    const { name, contact, email, dob } = req.body;
    const filename = req.file.originalname;
    const data = req.file.buffer;
    const image = { filename, data };
    const info = await new formModel({ name, contact, email, dob, image });
    await info.save();

    res.status(200).json({
      message: "Data uploaded successfully",
      info,
      fil,
    });
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
