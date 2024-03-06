const mongoose = require("mongoose");

const informationSchema = mongoose.Schema({
  name: {
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
    filename: String,
    data: Buffer,
  },
});

module.exports = mongoose.model("form", informationSchema);
