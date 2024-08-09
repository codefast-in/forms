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
    type: Object,
    url: "",
    fileId: "",
  },
});

module.exports = mongoose.model("user", informationSchema);
