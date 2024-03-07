const mongoose = require("mongoose");

const informationSchema = mongoose.Schema({
  fullname: {
    type: String,
    // require: true,
  },
  contact: {
    type: String,
    // require: true,
  },
  email: {
    type: String,
  },
  dob: {
    type: String,
  },
  image: {
    // filename: String,
    // data: Buffer,
    originalPath: String,
    fileType: String,
    height: Number,
    width: Number,
    fileName: String,
    fileSize: Number,
    uri: String,
  },
});

module.exports = mongoose.model("form", informationSchema);
