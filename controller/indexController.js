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
    const { name, contact, email, dob } = req.body;
    const filename = req.file.originalname;
    const data = req.file.buffer;
    const image = { filename, data };
    const info = await new formModel({ name, contact, email, dob, image });
    await info.save();

    res.status(200).json({
      message: "Create Successfull!",
      info,
    });
  } catch (error) {
    res.json(error.message);
  }
};

// exports.create = async (req, res) => {
//   try {
//     const { name, contact } = req.body;
//     const imageBuffer = req.file.buffer;
//     const filename = req.file.originalname;

//     // Create a write stream to GridFS
//     const writeStream = new gfs.createWriteStream({
//       filename: filename, // You can customize the filename as needed
//       mode: "w",
//       content_type: "*", // Set the content type of your image
//     });

//     // Pipe the image buffer to the write stream
//     writeStream.write(imageBuffer);
//     writeStream.end();

//     // Save user details to MongoDB
//     // const user = new User({
//     //   name,
//     //   contact,
//     //   // Save the image filename or other details as needed
//     // });

//     // await user.save();

//     // Send a JSON response
//     res
//       .status(201)
//       .json({ message: "User and image saved successfully!", writeStream });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

exports.read = async (req, res, next) => {
  try {
    const data = await formModel.find();
    res.status(200).json({ meaage: "Rad All Data", data });
  } catch (error) {
    res.json(error.message);
  }
};
